import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import LamenMap from './components/LamenMap';
import './App.css';

const InfoPanel = lazy(() => import('./components/InfoPanel'));
const LamenList = lazy(() => import('./components/LamenList'));
const AngelFinder = lazy(() => import('./components/AngelFinder'));

function getInitialView() {
  const savedView = window.localStorage.getItem('lamen-view');
  return savedView === 'list' ? 'list' : 'wheel';
}

function App() {
  const [activeSegmentId, setActiveSegmentId] = useState(null);
  const [view, setView] = useState(getInitialView);
  const [showAngelFinder, setShowAngelFinder] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('lamen-view', view);
  }, [view]);

  const handleSegmentClick = useCallback((id) => {
    setActiveSegmentId(id);
  }, []);

  const handleClosePanel = useCallback(() => {
    setActiveSegmentId(null);
  }, []);

  const handleViewChange = useCallback((nextView) => {
    setView(nextView);
    setActiveSegmentId(null);
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
    </div>
  );
}

export default App;
