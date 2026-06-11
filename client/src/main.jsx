import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// נקודת הכניסה של React — מחבר את ה-App לאלמנט #root ב-index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
