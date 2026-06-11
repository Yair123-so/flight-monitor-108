const mongoose = require('mongoose');

// Schema = תבנית הנתונים שיישמרו ב-MongoDB
// כל שדה מוגדר עם טיפוס ותחום ערכים תקין
const flightDataSchema = new mongoose.Schema({
  altitude: {
    type: Number,
    required: true,
    min: 0,
    max: 3000
  },
  his: {
    type: Number,
    required: true,
    min: 0,
    max: 360
  },
  adi: {
    type: Number,
    required: true,
    min: -100,
    max: 100
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// יצירת מודל מהסכמה — זה מה שמדבר עם MongoDB
module.exports = mongoose.model('FlightData', flightDataSchema);
