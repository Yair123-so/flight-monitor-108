import React, { useState } from 'react';
import AltitudeGauge from './AltitudeGauge';
import HISGauge from './HISGauge';
import ADIGauge from './ADIGauge';
import './MonitorDisplay.css';

const MonitorDisplay = ({ data, onAddClick }) => {
  const [mode, setMode] = useState('visual');

  return (
    <div className="monitor">
      <div className="monitor-header">
        <button
          className={`mode-btn text-btn ${mode === 'text' ? 'active' : ''}`}
          onClick={() => setMode('text')}
        >
          TEXT
        </button>
        <button
          className={`mode-btn visual-btn ${mode === 'visual' ? 'active' : ''}`}
          onClick={() => setMode('visual')}
        >
          VISUAL
        </button>
        <button className="add-btn" onClick={onAddClick}>+</button>
      </div>

      {!data ? (
        <div className="no-data">אין נתונים. לחץ + להוספה.</div>
      ) : mode === 'visual' ? (
        <div className="visual-display">
          <AltitudeGauge value={data.altitude} />
          <HISGauge value={data.his} />
          <ADIGauge value={data.adi} />
        </div>
      ) : (
        <div className="text-display">
          <div className="text-card altitude-card">
            <div className="card-label">Altitude</div>
            <div className="card-value">{data.altitude}</div>
          </div>
          <div className="text-card his-card">
            <div className="card-label">HIS</div>
            <div className="card-value">{data.his}</div>
          </div>
          <div className="text-card adi-card">
            <div className="card-label">ADI</div>
            <div className="card-value">{data.adi}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorDisplay;
