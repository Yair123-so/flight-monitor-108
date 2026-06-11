import React, { useState, useEffect } from 'react';
import MonitorDisplay from './components/MonitorDisplay';
import DataInputDialog from './components/DataInputDialog';

// App הוא ה-component הראשי שמנהל את המצב של כל האפליקציה
// State = מצב, useState = Hook שמגדיר משתנה שינוי מחייב רינדר מחדש
function App() {
  const [flightData, setFlightData] = useState(null);   // הנתונים מהשרת
  const [showDialog, setShowDialog] = useState(false);  // האם הדיאלוג פתוח
  const [loading, setLoading] = useState(true);         // האם בטעינה
  const [serverError, setServerError] = useState('');   // שגיאת חיבור

  // שליפת הנתון האחרון מהשרת
  const fetchLatestData = async () => {
    try {
      const res = await fetch('/api/flight-data/latest');
      if (res.ok) {
        const data = await res.json();
        setFlightData(data);
        setServerError('');
      } else if (res.status !== 404) {
        setServerError('שגיאה בקבלת נתונים מהשרת');
      }
    } catch {
      setServerError('אין חיבור לשרת. ודא שה-server פועל.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect = רץ פעם אחת כשה-component נטען
  // ומגדיר polling כל 5 שניות לעדכון אוטומטי
  useEffect(() => {
    fetchLatestData();
    const interval = setInterval(fetchLatestData, 5000);
    return () => clearInterval(interval); // ניקוי כשה-component נסגר
  }, []);

  // שליחת נתונים חדשים ל-POST /api/flight-data
  const handleSubmit = async (data) => {
    const res = await fetch('/api/flight-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'שגיאת שרת');
    }

    await fetchLatestData(); // רענון מיידי אחרי שמירה
  };

  if (loading) {
    return <div className="loading">מתחבר לשרת...</div>;
  }

  return (
    <div className="app">
      <h1>מוניטור מכווני טיסה</h1>

      {serverError && (
        <div className="error-banner">{serverError}</div>
      )}

      <MonitorDisplay
        data={flightData}
        onAddClick={() => setShowDialog(true)}
      />

      {showDialog && (
        <DataInputDialog
          onClose={() => setShowDialog(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
