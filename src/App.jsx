import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import LamenMap from './components/LamenMap';
import { findCatalogItem } from './data/catalog';
import './App.css';

const InfoPanel = lazy(() => import('./components/InfoPanel'));
const LamenList = lazy(() => import('./components/LamenList'));
const AngelFinder = lazy(() => import('./components/AngelFinder'));
const SavedItems = lazy(() => import('./components/SavedItems'));

function getInitialView() {
  const savedView = window.localStorage.getItem('lamen-view');
  return savedView === 'list' ? 'list' : 'wheel';
}

function getInitialSegmentId() {
  const params = new URLSearchParams(window.location.search);
  const item = findCatalogItem(params.get('item'));
  return item?.id || null;
}

function writeSegmentToUrl(segmentId) {
  const url = new URL(window.location.href);
  const item = findCatalogItem(segmentId);

  if (item) {
    url.searchParams.set('item', item.slug || item.id);
  } else {
    url.searchParams.delete('item');
  }

  window.history.replaceState({}, '', url);
}

function readStoredIds(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function App() {
  const [activeSegmentId, setActiveSegmentId] = useState(getInitialSegmentId);
  const [view, setView] = useState(getInitialView);
  const [showAngelFinder, setShowAngelFinder] = useState(false);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredIds('lamen-favorites'));
  const [recentIds, setRecentIds] = useState(() => readStoredIds('lamen-recent'));

  useEffect(() => {
    window.localStorage.setItem('lamen-view', view);
  }, [view]);

  useEffect(() => {
    writeSegmentToUrl(activeSegmentId);
  }, [activeSegmentId]);

  useEffect(() => {
    window.localStorage.setItem('lamen-favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    window.localStorage.setItem('lamen-recent', JSON.stringify(recentIds));
  }, [recentIds]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveSegmentId(getInitialSegmentId());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSegmentClick = useCallback((id) => {
    setActiveSegmentId(id);
    setRecentIds((current) => [id, ...current.filter((item) => item !== id)].slice(0, 12));
  }, []);

  const handleClosePanel = useCallback(() => {
    setActiveSegmentId(null);
  }, []);

  const handleViewChange = useCallback((nextView) => {
    setView(nextView);
    setActiveSegmentId(null);
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((current) => (
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [id, ...current]
    ));
  }, []);

  return (
    <div className="app-container">
      <div className="ambient-glow"></div>

      <header className="view-toolbar" aria-label="Modo de visualização">
        <div className="view-switcher" role="group" aria-label="Escolher visualização">
          <button
            type="button"
            className={`view-button ${view === 'wheel' ? 'active' : ''}`}
            aria-pressed={view === 'wheel'}
            onClick={() => handleViewChange('wheel')}
          >
            <span aria-hidden="true">◎</span>
            Roda
          </button>
          <button
            type="button"
            className={`view-button ${view === 'list' ? 'active' : ''}`}
            aria-pressed={view === 'list'}
            onClick={() => handleViewChange('list')}
          >
            <span aria-hidden="true">☷</span>
            Lista
          </button>
        </div>

        <button
          type="button"
          className="finder-launch"
          onClick={() => setShowAngelFinder(true)}
        >
          ✦ Meu anjo
        </button>
        <button
          type="button"
          className="saved-launch"
          onClick={() => setShowSavedItems(true)}
        >
          ★ Salvos
        </button>
      </header>

      <main className={`main-content ${view === 'list' ? 'list-mode' : ''}`}>
        {view === 'wheel' ? (
          <div className="map-container">
            <LamenMap onSegmentClick={handleSegmentClick} activeSegmentId={activeSegmentId} />
          </div>
        ) : (
          <Suspense fallback={<div className="view-loading">Carregando catálogo…</div>}>
            <LamenList
              onSegmentClick={handleSegmentClick}
              activeSegmentId={activeSegmentId}
            />
          </Suspense>
        )}
      </main>

      {activeSegmentId && (
        <Suspense fallback={null}>
          <InfoPanel
            activeSegmentId={activeSegmentId}
            onClose={handleClosePanel}
            isFavorite={favoriteIds.includes(activeSegmentId)}
            onToggleFavorite={() => toggleFavorite(activeSegmentId)}
          />
        </Suspense>
      )}

      {showAngelFinder && (
        <Suspense fallback={null}>
          <AngelFinder
            onClose={() => setShowAngelFinder(false)}
            onSelectAngel={handleSegmentClick}
          />
        </Suspense>
      )}

      {showSavedItems && (
        <Suspense fallback={null}>
          <SavedItems
            favoriteIds={favoriteIds}
            recentIds={recentIds}
            onClose={() => setShowSavedItems(false)}
            onSelect={(id) => {
              handleSegmentClick(id);
              setShowSavedItems(false);
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
