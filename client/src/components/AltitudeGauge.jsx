import React from 'react';

// מד גובה אנכי — פס שחור עולה לפי Altitude, חץ כחול מצביע על הגובה הנוכחי
const AltitudeGauge = ({ value }) => {
  const MAX_ALT = 3000;
  const GAUGE_HEIGHT = 200;
  const GAUGE_WIDTH = 60;
  const SCALE_X = 38;
  const BAR_X = 42;
  const SVG_WIDTH = 140;
  const SVG_HEIGHT = GAUGE_HEIGHT + 30;

  const clamped = Math.max(0, Math.min(MAX_ALT, value || 0));
  const barHeight = (clamped / MAX_ALT) * GAUGE_HEIGHT;
  const barY = 10 + GAUGE_HEIGHT - barHeight;
  const arrowY = barY;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14 }}>Altitude</div>
      <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        <defs>
          <marker id="alt-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 z" fill="#1565C0" />
          </marker>
        </defs>

        {/* סימוני סקלה בצד שמאל */}
        <text x={SCALE_X} y={14}                        textAnchor="end" fontSize="11" fill="#333">3000</text>
        <text x={SCALE_X} y={10 + GAUGE_HEIGHT * 0.33 + 4} textAnchor="end" fontSize="11" fill="#333">2000</text>
        <text x={SCALE_X} y={10 + GAUGE_HEIGHT * 0.67 + 4} textAnchor="end" fontSize="11" fill="#333">1000</text>
        <text x={SCALE_X} y={10 + GAUGE_HEIGHT + 4}    textAnchor="end" fontSize="11" fill="#333">0</text>

        {/* רקע לבן של ה-Gauge עם border כחול */}
        <rect x={BAR_X} y={10} width={GAUGE_WIDTH} height={GAUGE_HEIGHT}
          fill="white" stroke="#2196F3" strokeWidth="2.5" />

        {/* הפס השחור — מייצג את הגובה */}
        <rect x={BAR_X} y={barY} width={GAUGE_WIDTH} height={barHeight} fill="#222" />

        {/* חץ כחול שמצביע ימינה על הגובה הנוכחי */}
        {barHeight > 0 && (
          <line
            x1={BAR_X + GAUGE_WIDTH} y1={arrowY}
            x2={BAR_X + GAUGE_WIDTH + 22} y2={arrowY}
            stroke="#1565C0" strokeWidth="2.5"
            markerEnd="url(#alt-arrow)"
          />
        )}
      </svg>
    </div>
  );
};

export default AltitudeGauge;
