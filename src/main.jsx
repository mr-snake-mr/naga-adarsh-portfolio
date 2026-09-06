import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// apply theme before first paint to avoid a flash
(function initTheme() {
  const root = document.documentElement;
  let theme = null;
  try {
    theme = localStorage.getItem('na-theme');
  } catch (e) {
    /* ignore */
  }
  // light is the default; only a saved choice overrides it
  if (theme !== 'light' && theme !== 'dark') {
    theme = 'light';
  }
  root.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e1322' : '#fffbea');
})();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
