import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const NAV = [
  { label: 'work', href: '#work' },
  { label: 'demo', href: '#play' },
  { label: 'experience', href: '#client' },
  { label: 'credentials', href: '#proof' },
  { label: 'contact', href: '#contact' },
  { label: 'résumé (pdf)', href: '/assets/resume.pdf', download: 'Naga_Adarsh_Resume.pdf' },
];

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(currentTheme);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('na-theme', next);
    } catch (e) {
      /* private mode etc. */
    }
    setTheme(next);
  }

  return (
    <header className="topbar" data-component="site-header">
      <div className="container">
        <div className="topbar-row">
          <a className="brand" href="#top">naga adarsh</a>

          <nav className="nav-desktop" aria-label="Primary">
            <ul className="nav-list">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    className="nav-link"
                    href={item.href}
                    {...(item.download ? { download: item.download } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="topbar-right">
            <span className="dot-cluster" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="sticker sticker-lime">open to internships — class of 2027</span>
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'switch to light theme' : 'switch to dark theme'}
              title={theme === 'dark' ? 'light mode' : 'dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} strokeWidth={1.9} /> : <Moon size={18} strokeWidth={1.9} />}
            </button>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="menu-panel"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'close' : 'menu'}
            </button>
          </div>
        </div>

        {open && (
          <nav className="menu-panel" id="menu-panel" aria-label="Mobile" data-component="nav-menu">
            <ul>
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    {...(item.download ? { download: item.download } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
