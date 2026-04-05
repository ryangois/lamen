import { useState } from 'react';
import LamenMap from './components/LamenMap';
import InfoPanel from './components/InfoPanel';
import './App.css';

function App() {
  const [activeSegmentId, setActiveSegmentId] = useState(null);

  const handleSegmentClick = (id) => {
    setActiveSegmentId(id);
  };

  const handleClosePanel = () => {
    setActiveSegmentId(null);
  };

  return (
    <div className="app-container">
      {/* Background ambient glow effect */}
      <div className="ambient-glow"></div>

      <main className="main-content">
        <div className="title-container">
          <h1 className="brand-font main-title">Interactive Lamen</h1>
          <p className="subtitle">Hover and click the components to discover their hidden meaning.</p>
        </div>

        <div className="map-container">
          <LamenMap onSegmentClick={handleSegmentClick} activeSegmentId={activeSegmentId} />
        </div>
      </main>

      <InfoPanel
        activeSegmentId={activeSegmentId}
        onClose={handleClosePanel}
      />
    </div>
  );
}

export default App;
