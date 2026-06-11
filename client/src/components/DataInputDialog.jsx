import React, { useState } from 'react';
import './DataInputDialog.css';

// Dialog לקליטת נתוני טיסה חדשים
// props: onClose (סגירת הדיאלוג), onSubmit (שליחה לשרת)
const DataInputDialog = ({ onClose, onSubmit }) => {
  const [altitude, setAltitude] = useState('');
  const [his, setHis] = useState('');
  const [adi, setAdi] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setError('');

    // המרה למספרים
    const altNum = parseFloat(altitude);
    const hisNum = parseFloat(his);
    const adiNum = parseFloat(adi);

    // ולידציה בצד הלקוח (הגנה ראשונה לפני השרת)
    if (isNaN(altNum) || isNaN(hisNum) || isNaN(adiNum)) {
      setError('יש למלא את כל השדות עם ערכים מספריים');
      return;
    }
    if (altNum < 0 || altNum > 3000) {
      setError('Altitude חייב להיות בין 0 ל-3000');
      return;
    }
    if (hisNum < 0 || hisNum > 360) {
      setError('HIS חייב להיות בין 0 ל-360');
      return;
    }
    if (adiNum < -100 || adiNum > 100) {
      setError('ADI חייב להיות בין -100 ל-100');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ altitude: altNum, his: hisNum, adi: adiNum });
      onClose();
    } catch (err) {
      setError('שגיאה בשליחה לשרת: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      {/* stopPropagation מונע סגירה בלחיצה בתוך הדיאלוג */}
      <div className="dialog" onClick={e => e.stopPropagation()}>

        <div className="dialog-row">
          <label>Altitude</label>
          <input
            type="number"
            value={altitude}
            onChange={e => setAltitude(e.target.value)}
            placeholder="0 – 3000"
          />
        </div>

        <div className="dialog-row">
          <label>HIS</label>
          <input
            type="number"
            value={his}
            onChange={e => setHis(e.target.value)}
            placeholder="0 – 360"
          />
        </div>

        <div className="dialog-row">
          <label>ADI</label>
          <input
            type="number"
            value={adi}
            onChange={e => setAdi(e.target.value)}
            placeholder="-100 – 100"
          />
        </div>

        {error && <div className="dialog-error">{error}</div>}

        <div className="dialog-footer">
          <button className="send-btn" onClick={handleSend} disabled={loading}>
            {loading ? '...' : 'SEND'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataInputDialog;
