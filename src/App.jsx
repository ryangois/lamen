import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import LamenMap from './components/LamenMap';
import { findRouteItem, getRoutePath } from './data/routes';
import './App.css';

const InfoPanel = lazy(() => import('./components/InfoPanel'));
const LamenList = lazy(() => import('./components/LamenList'));
const TreeOfLife = lazy(() => import('./components/TreeOfLife'));
const Oracle = lazy(() => import('./components/Oracle'));
const AngelFinder = lazy(() => import('./components/AngelFinder'));
const SavedItems = lazy(() => import('./components/SavedItems'));
const HelpModal = lazy(() => import('./components/HelpModal'));
const GlobalSearch = lazy(() => import('./components/GlobalSearch'));
const ComparePanel = lazy(() => import('./components/ComparePanel'));
const StudyPath = lazy(() => import('./components/StudyPath'));

function getInitialView() {
  const savedView = window.localStorage.getItem('lamen-view');
  return ['wheel', 'list', 'tree', 'oracle'].includes(savedView) ? savedView : 'wheel';
}

function getInitialSegmentId() {
  const params = new URLSearchParams(window.location.search);
  const item = findRouteItem(params.get('item')) || findRouteItem(window.location.pathname);
  return item?.id || null;
}

function writeSegmentToUrl(segmentId) {
  const url = new URL(window.location.href);
  const item = findRouteItem(segmentId);

  if (item) {
    url.pathname = getRoutePath(item.id);
    url.searchParams.delete('item');
  } else {
    url.searchParams.delete('item');
    url.pathname = '/';
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

function readStoredRecent() {
  try {
    const value = JSON.parse(window.localStorage.getItem('lamen-recent') || '[]');
    if (!Array.isArray(value)) return [];
    return value
      .map((entry, index) => (
        typeof entry === 'string'
          ? { id: entry, viewedAt: Date.now() - index }
          : entry
      ))
      .filter((entry) => entry?.id);
  } catch {
    return [];
  }
}

function App() {
  const [activeSegmentId, setActiveSegmentId] = useState(getInitialSegmentId);
  const [view, setView] = useState(getInitialView);
  const [showAngelFinder, setShowAngelFinder] = useState(false);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [comparisonId, setComparisonId] = useState(null);
  const [showStudy, setShowStudy] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredIds('lamen-favorites'));
  const [recentEntries, setRecentEntries] = useState(readStoredRecent);

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
    window.localStorage.setItem('lamen-recent', JSON.stringify(recentEntries));
  }, [recentEntries]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveSegmentId(getInitialSegmentId());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;

      if (comparisonId) setComparisonId(null);
      else if (showStudy) setShowStudy(false);
      else if (showSearch) setShowSearch(false);
      else if (showHelp) setShowHelp(false);
      else if (showSavedItems) setShowSavedItems(false);
      else if (showAngelFinder) setShowAngelFinder(false);
      else if (activeSegmentId) setActiveSegmentId(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSegmentId, comparisonId, showAngelFinder, showHelp, showSavedItems, showSearch, showStudy]);

  useEffect(() => {
    const handleSearchShortcut = (event) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
      const tagName = event.target?.tagName;
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return;
      event.preventDefault();
      setShowSearch(true);
    };

    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, []);

  const handleSegmentClick = useCallback((id) => {
    setActiveSegmentId(id);
    setRecentEntries((current) => [
      { id, viewedAt: Date.now() },
      ...current.filter((entry) => entry.id !== id),
    ].slice(0, 20));
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

      <header className="view-toolbar" aria-label="Navegação principal">
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
          <button
            type="button"
            className={`view-button ${view === 'tree' ? 'active' : ''}`}
            aria-pressed={view === 'tree'}
            onClick={() => handleViewChange('tree')}
          >
            <span aria-hidden="true">✦</span>
            Árvore
          </button>
          <button
            type="button"
            className={`view-button ${view === 'oracle' ? 'active' : ''}`}
            aria-pressed={view === 'oracle'}
            onClick={() => handleViewChange('oracle')}
          >
            <span aria-hidden="true">✺</span>
            Oráculo
          </button>
          <button
            type="button"
            className="view-button"
            aria-label="Abrir trilha de estudo"
            onClick={() => setShowStudy(true)}
          >
            <span aria-hidden="true">◫</span>
            Estudo
          </button>
          <button
            type="button"
            className="view-button"
            aria-label="Abrir busca universal"
            onClick={() => setShowSearch(true)}
          >
            <span aria-hidden="true">⌕</span>
            Buscar
          </button>
          <button
            type="button"
            className="view-button"
            aria-label="Abrir calculadora Meu Anjo"
            onClick={() => setShowAngelFinder(true)}
          >
            <span aria-hidden="true">✧</span>
            Meu anjo
          </button>
          <button
            type="button"
            className="view-button"
            aria-label="Abrir favoritos e histórico"
            onClick={() => setShowSavedItems(true)}
          >
            <span aria-hidden="true">★</span>
            Salvos
          </button>
        </div>
      </header>

      <button
        type="button"
        className="help-launch"
        aria-label="Abrir ajuda de uso"
        onClick={() => setShowHelp(true)}
      >
        <span aria-hidden="true">?</span>
      </button>

      <main className={`main-content ${view === 'list' ? 'list-mode' : ''} ${view === 'tree' ? 'tree-mode' : ''} ${view === 'oracle' ? 'oracle-mode' : ''}`}>
        {view === 'wheel' ? (
          <div className="map-container">
            <LamenMap onSegmentClick={handleSegmentClick} activeSegmentId={activeSegmentId} />
          </div>
        ) : view === 'list' ? (
          <Suspense fallback={<div className="view-loading">Carregando catálogo…</div>}>
            <LamenList
              onSegmentClick={handleSegmentClick}
              activeSegmentId={activeSegmentId}
            />
          </Suspense>
        ) : view === 'tree' ? (
          <Suspense fallback={<div className="view-loading">Carregando Árvore…</div>}>
            <TreeOfLife
              onSegmentClick={handleSegmentClick}
              activeSegmentId={activeSegmentId}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<div className="view-loading">Carregando Oráculo…</div>}>
            <Oracle onSegmentClick={handleSegmentClick} />
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
            onNavigateSegment={handleSegmentClick}
            onCompare={() => setComparisonId(activeSegmentId)}
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
            recentEntries={recentEntries}
            onClearHistory={() => setRecentEntries([])}
            onClose={() => setShowSavedItems(false)}
            onSelect={(id) => {
              handleSegmentClick(id);
              setShowSavedItems(false);
            }}
          />
        </Suspense>
      )}

      {showHelp && (
        <Suspense fallback={null}>
          <HelpModal onClose={() => setShowHelp(false)} />
        </Suspense>
      )}

      {showSearch && (
        <Suspense fallback={null}>
          <GlobalSearch
            onClose={() => setShowSearch(false)}
            onSelect={(id) => {
              handleSegmentClick(id);
              setShowSearch(false);
            }}
          />
        </Suspense>
      )}

      {comparisonId && (
        <Suspense fallback={null}>
          <ComparePanel
            initialId={comparisonId}
            onClose={() => setComparisonId(null)}
            onOpen={(id) => {
              handleSegmentClick(id);
              setComparisonId(null);
            }}
          />
        </Suspense>
      )}

      {showStudy && (
        <Suspense fallback={null}>
          <StudyPath
            onClose={() => setShowStudy(false)}
            onOpen={(id) => {
              handleSegmentClick(id);
              setShowStudy(false);
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
