import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// There is one theme. The six chapters are art-directed at six different
// luminances, so there is no second scheme to switch into — nothing to read from
// localStorage, and nothing to stamp on <html> before first paint.

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
