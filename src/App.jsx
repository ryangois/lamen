import { lazy, Suspense, useCallback, useState } from 'react';
import LamenMap from './components/LamenMap';
import './App.css';

const InfoPanel = lazy(() => import('./components/InfoPanel'));

function App() {
  const [activeSegmentId, setActiveSegmentId] = useState(null);

  const handleSegmentClick = useCallback((id) => {
    setActiveSegmentId(id);
  }, []);

  const handleClosePanel = useCallback(() => {
    setActiveSegmentId(null);
  }, []);

  return (
    <div className="app-container">
      {/* Background ambient glow effect */}
      <div className="ambient-glow"></div>

      <main className="main-content">


        <div className="map-container">
          <LamenMap onSegmentClick={handleSegmentClick} activeSegmentId={activeSegmentId} />
        </div>
      </main>

      {activeSegmentId && (
        <Suspense fallback={null}>
          <InfoPanel
            activeSegmentId={activeSegmentId}
            onClose={handleClosePanel}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
