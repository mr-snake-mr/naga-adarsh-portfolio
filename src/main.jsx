import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
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
  // A saved choice wins. Otherwise light, always — deliberately ignoring
  // prefers-color-scheme so a dark-set device still lands on the paper theme.
  if (theme !== 'light' && theme !== 'dark') theme = 'light';
  root.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#14110c' : '#f7f3e8');
})();

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production builds prerender the page into #root (see scripts/prerender.mjs), so
// that markup is hydrated rather than thrown away. Dev keeps the plain render.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
