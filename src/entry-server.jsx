import { renderToString } from 'react-dom/server';
import App from './App';

// Server entry, used only by scripts/prerender.mjs at build time. It renders the
// same <App/> to a string so dist/index.html ships the page's real content
// instead of an empty #root — crawlers that do not execute JavaScript (and any
// client with JS still loading) get the full page.
export function render() {
  return renderToString(<App />);
}
