import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LamenMap from './components/LamenMap';
import MobileNavigation from './components/MobileNavigation';
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

function writeSegmentToUrl(segmentId, method = 'replaceState') {
  const url = new URL(window.location.href);
  const item = findRouteItem(segmentId);

  if (item) {
    url.pathname = getRoutePath(item.id);
    url.searchParams.delete('item');
  } else {
    url.searchParams.delete('item');
    url.pathname = '/';
  }
  url.searchParams.delete('acao');

  const currentDepth = Number(window.history.state?.lamenDepth) || 0;
  const nextDepth = method === 'pushState'
    ? currentDepth + 1
    : item
      ? currentDepth
      : 0;

  window.history[method]({
    lamenEntry: Boolean(item),
    lamenDepth: nextDepth,
  }, '', url);
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

function readStoredCollections() {
  try {
    const stored = JSON.parse(window.localStorage.getItem('lamen-favorite-collections') || '[]');
    if (Array.isArray(stored) && stored.length > 0) {
      return stored
        .filter((collection) => collection?.id && collection?.name)
        .map((collection) => ({
          ...collection,
          itemIds: Array.isArray(collection.itemIds) ? collection.itemIds.filter(Boolean) : [],
        }));
    }
  } catch {
    // The legacy favorites migration below remains available.
  }

  return [{
    id: 'favorites',
    name: 'Favoritos',
    itemIds: readStoredIds('lamen-favorites'),
  }];
}

function App() {
  const closePanelOnPopRef = useRef(false);
  const [activeSegmentId, setActiveSegmentId] = useState(getInitialSegmentId);
  const [view, setView] = useState(getInitialView);
  const [showAngelFinder, setShowAngelFinder] = useState(() => (
    new URLSearchParams(window.location.search).get('acao') === 'meu-anjo'
  ));
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [comparisonId, setComparisonId] = useState(null);
  const [showStudy, setShowStudy] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [favoriteCollections, setFavoriteCollections] = useState(readStoredCollections);
  const [recentEntries, setRecentEntries] = useState(readStoredRecent);
  const favoriteIds = useMemo(() => (
    [...new Set(favoriteCollections.flatMap((collection) => collection.itemIds))]
  ), [favoriteCollections]);

  useEffect(() => {
    window.localStorage.setItem('lamen-view', view);
  }, [view]);

  useEffect(() => {
    window.localStorage.setItem('lamen-favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    window.localStorage.setItem('lamen-favorite-collections', JSON.stringify(favoriteCollections));
  }, [favoriteCollections]);

  useEffect(() => {
    window.localStorage.setItem('lamen-recent', JSON.stringify(recentEntries));
  }, [recentEntries]);

  useEffect(() => {
    const initialItem = getInitialSegmentId();
    window.history.replaceState({
      ...window.history.state,
      lamenEntry: Boolean(initialItem),
      lamenDepth: Number(window.history.state?.lamenDepth) || 0,
    }, '', window.location.href);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (closePanelOnPopRef.current) {
        closePanelOnPopRef.current = false;
        setActiveSegmentId(null);
        writeSegmentToUrl(null);
        return;
      }
      setActiveSegmentId(getInitialSegmentId());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleClosePanel = useCallback(() => {
    const depth = Number(window.history.state?.lamenDepth) || 0;
    if (depth > 0) {
      closePanelOnPopRef.current = true;
      window.history.go(-depth);
      return;
    }
    setActiveSegmentId(null);
    writeSegmentToUrl(null);
  }, []);

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => setInstallPrompt(null);
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;

      if (showMobileMenu) setShowMobileMenu(false);
      else if (comparisonId) setComparisonId(null);
      else if (showStudy) setShowStudy(false);
      else if (showSearch) setShowSearch(false);
      else if (showHelp) setShowHelp(false);
      else if (showSavedItems) setShowSavedItems(false);
      else if (showAngelFinder) setShowAngelFinder(false);
      else if (activeSegmentId) handleClosePanel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSegmentId, comparisonId, handleClosePanel, showAngelFinder, showHelp, showMobileMenu, showSavedItems, showSearch, showStudy]);

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
    if (id !== activeSegmentId) writeSegmentToUrl(id, 'pushState');
    setActiveSegmentId(id);
    setRecentEntries((current) => [
      { id, viewedAt: Date.now() },
      ...current.filter((entry) => entry.id !== id),
    ].slice(0, 20));
  }, [activeSegmentId]);

  const handleViewChange = useCallback((nextView) => {
    setView(nextView);
    setActiveSegmentId(null);
    writeSegmentToUrl(null);
  }, []);

  const handleInstallApp = useCallback(async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }, [installPrompt]);

  const handleImportedData = useCallback(({ collections, recentEntries: importedRecent }) => {
    setFavoriteCollections(collections);
    setRecentEntries(importedRecent);
  }, []);

  const toggleCollectionItem = useCallback((collectionId, itemId) => {
    setFavoriteCollections((current) => current.map((collection) => (
      collection.id === collectionId
        ? {
            ...collection,
            itemIds: collection.itemIds.includes(itemId)
              ? collection.itemIds.filter((id) => id !== itemId)
              : [itemId, ...collection.itemIds],
          }
        : collection
    )));
  }, []);

  const createFavoriteCollection = useCallback((name) => {
    const normalizedName = name.trim();
    if (!normalizedName) return null;
    const id = `collection-${Date.now().toString(36)}`;
    setFavoriteCollections((current) => [
      ...current,
      { id, name: normalizedName.slice(0, 36), itemIds: [] },
    ]);
    return id;
  }, []);

  const deleteFavoriteCollection = useCallback((collectionId) => {
    if (collectionId === 'favorites') return;
    setFavoriteCollections((current) => current.filter((collection) => collection.id !== collectionId));
  }, []);

  return (
    <div className="app-container">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
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

      <MobileNavigation
        open={showMobileMenu}
        view={view}
        savedCount={favoriteIds.length}
        onOpen={() => setShowMobileMenu(true)}
        onClose={() => setShowMobileMenu(false)}
        onViewChange={handleViewChange}
        onSearch={() => setShowSearch(true)}
        onStudy={() => setShowStudy(true)}
        onTutorial={() => setShowHelp(true)}
        onAngelFinder={() => setShowAngelFinder(true)}
        onSaved={() => setShowSavedItems(true)}
        canInstall={Boolean(installPrompt)}
        onInstall={handleInstallApp}
      />

      <button
        type="button"
        className="help-launch"
        aria-label="Abrir ajuda de uso"
        onClick={() => setShowHelp(true)}
      >
        <span aria-hidden="true">?</span>
      </button>

      <main
        id="main-content"
        tabIndex="-1"
        className={`main-content ${view === 'list' ? 'list-mode' : ''} ${view === 'tree' ? 'tree-mode' : ''} ${view === 'oracle' ? 'oracle-mode' : ''}`}
      >
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
            favoriteCollections={favoriteCollections}
            onToggleCollection={(collectionId) => toggleCollectionItem(collectionId, activeSegmentId)}
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
            collections={favoriteCollections}
            recentEntries={recentEntries}
            onCreateCollection={createFavoriteCollection}
            onDeleteCollection={deleteFavoriteCollection}
            onImportedData={handleImportedData}
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
