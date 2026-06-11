import React from 'react';

// אופק מלאכותי (Attitude Direction Indicator)
// ADI = 100: כל העיגול כחול (שמיים, הטיה מקסימלית למעלה)
// ADI = 0:   כל העיגול ירוק (קרקע)
// בין לבין: חצי כחול (שמיים) + חצי ירוק (קרקע), הקו זזinear
const ADIGauge = ({ value }) => {
  const R = 80;
  const cx = 100;
  const cy = 100;
  const SIZE = 200;

  // ממפה 0..100 ל-0..1 (אחוז כחול)
  // ערכים שליליים (-100..0) = כולו ירוק (p=0)
  const p = Math.max(0, Math.min(100, value || 0)) / 100;

  // מיקום קו האופק:
  // p=0 (ADI=0):   horizonY = cy - R (מעל העיגול) → כל העיגול ירוק
  // p=1 (ADI=100): horizonY = cy + R (מתחת לעיגול) → כל העיגול כחול
  const horizonY = cy - R + 2 * R * p;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14 }}>ADI</div>
      <svg width={SIZE} height={SIZE}>
        <defs>
          {/* clipPath מגביל את הציור לתוך העיגול בלבד */}
          <clipPath id="adi-circle-clip">
            <circle cx={cx} cy={cy} r={R} />
          </clipPath>
        </defs>

        {/* כל מה שבתוך clipPath מצויר רק בתוך גבולות העיגול */}
        <g clipPath="url(#adi-circle-clip)">
          {/* רקע ירוק (קרקע) — מכסה את כל העיגול */}
          <rect x={0} y={0} width={SIZE} height={SIZE} fill="#4CAF50" />

          {/* מלבן כחול (שמיים) — מכסה מלמעלה עד קו האופק */}
          <rect x={0} y={0} width={SIZE} height={horizonY} fill="#2196F3" />
        </g>

        {/* מסגרת העיגול */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#333" strokeWidth="2.5" />

        {/* קו ייחוס מרכזי (לבן) */}
        <line x1={cx - 25} y1={cy} x2={cx + 25} y2={cy} stroke="white" strokeWidth="2" opacity="0.7" />
      </svg>
    </div>
  );
};

export default ADIGauge;
