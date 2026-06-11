const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const FlightData = require('./models/FlightData');

const app = express();
const PORT = 3001;
const MONGO_URI = 'mongodb://localhost:27017/flight-monitor';

app.use(cors());
app.use(express.json());

// הגשת קבצי ה-React (build) לכל המכשירים ברשת
const clientBuild = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuild));

// ===== API ROUTES =====

// POST /api/flight-data — קבלת נתונים חדשים ושמירה ב-MongoDB
app.post('/api/flight-data', async (req, res) => {
  try {
    const { altitude, his, adi } = req.body;

    // בדיקה שכל השדות הגיעו
    if (altitude === undefined || his === undefined || adi === undefined) {
      return res.status(400).json({ error: 'Missing fields: altitude, his, adi required' });
    }

    // יצירת רשומה חדשה (Mongoose יבדוק את הגבולות מהסכמה)
    const flightData = new FlightData({ altitude, his, adi });
    const saved = await flightData.save();

    res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/flight-data — קבלת כל הרשומות (מהחדש לישן)
app.get('/api/flight-data', async (req, res) => {
  try {
    const data = await FlightData.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/flight-data/latest — קבלת הרשומה האחרונה בלבד
app.get('/api/flight-data/latest', async (req, res) => {
  try {
    const latest = await FlightData.findOne().sort({ timestamp: -1 });
    if (!latest) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// כל שאר הנתיבים → React app
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

// ===== START SERVER =====
async function startServer() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected:', MONGO_URI);

  // האזנה על כל ממשקי הרשת (0.0.0.0) לאפשר גישה מכל מחשב ברשת הפרטית
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (accessible from any device on the network)`);
  });
}

startServer().catch(console.error);
