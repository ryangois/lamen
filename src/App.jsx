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
