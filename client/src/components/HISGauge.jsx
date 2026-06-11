import React from 'react';

// מצפן HIS — עיגול המצפן מסתובב לפי הערך, החץ הכתום במרכז קבוע תמיד
// HIS=0: 0 למעלה (מול החץ), HIS=90: 90 יגיע למעלה (מול החץ)
const HISGauge = ({ value }) => {
  const R = 80;
  const cx = 100;
  const cy = 100;
  const SIZE = 200;

  const clamped = Math.max(0, Math.min(360, value || 0));

  // העיגול מסתובב בכיוון שלילי — כך שהערך הנוכחי עולה לראש מול החץ הקבוע
  const rotateDeg = -clamped;

  // חישוב מיקום כל תווית לאחר סיבוב (הטקסט נשאר זקוף)
  const labels = [
    { deg: 0,   text: '0' },
    { deg: 90,  text: '90' },
    { deg: 180, text: '180' },
    { deg: 270, text: '270' },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14 }}>HIS</div>
      <svg width={SIZE} height={SIZE}>

        {/* ===== עיגול מסתובב: מסגרת + קווי סימון ===== */}
        <g transform={`rotate(${rotateDeg}, ${cx}, ${cy})`}>
          <circle cx={cx} cy={cy} r={R} fill="white" stroke="#333" strokeWidth="2" />
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
            const rad = ((deg - 90) * Math.PI) / 180;
            const isMain = deg % 90 === 0;
            return (
              <line key={deg}
                x1={cx + (R - (isMain ? 14 : 7)) * Math.cos(rad)}
                y1={cy + (R - (isMain ? 14 : 7)) * Math.sin(rad)}
                x2={cx + R * Math.cos(rad)}
                y2={cy + R * Math.sin(rad)}
                stroke="#333" strokeWidth={isMain ? 2 : 1}
              />
            );
          })}
        </g>

        {/* ===== תוויות (מסתובבות במיקום, אך טקסט זקוף) ===== */}
        {labels.map(({ deg, text }) => {
          // הזווית של התווית לאחר סיבוב העיגול
          const rad = ((deg - clamped - 90) * Math.PI) / 180;
          const tx = cx + (R - 18) * Math.cos(rad);
          const ty = cy + (R - 18) * Math.sin(rad);
          return (
            <text key={deg}
              x={tx} y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight={deg === 0 ? 'bold' : 'normal'}
              fill="#222"
            >
              {text}
            </text>
          );
        })}

        {/* ===== חץ כתום קבוע — תמיד מצביע למעלה, לא מסתובב ===== */}
        <line x1={cx} y1={cy + 45} x2={cx} y2={cy - 58}
          stroke="orange" strokeWidth="3" />
        {/* ראש החץ */}
        <polygon
          points={`${cx-7},${cy-54} ${cx+7},${cy-54} ${cx},${cy-70}`}
          fill="orange"
        />
        {/* זנב */}
        <polygon
          points={`${cx-5},${cy+42} ${cx+5},${cy+42} ${cx},${cy+54}`}
          fill="orange" opacity="0.5"
        />

        {/* נקודת מרכז */}
        <circle cx={cx} cy={cy} r={5} fill="#333" />
      </svg>
    </div>
  );
};

export default HISGauge;
