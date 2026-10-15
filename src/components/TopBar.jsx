import { useEffect, useState } from 'react';

const NAV = [
  { id: 'work', label: 'work', href: '#work' },
  { id: 'play', label: 'demo', href: '#play' },
  { id: 'client', label: 'experience', href: '#client' },
  { id: 'proof', label: 'credentials', href: '#proof' },
  { id: 'contact', label: 'contact', href: '#contact' },
];

// ?v= is a cache-buster: bump it every time public/assets/resume.pdf is replaced,
// otherwise browsers that already hold the old CV will not re-check for up to an hour.
const RESUME = { label: 'cv ↓', href: '/assets/resume.pdf?v=2026-10-12', download: 'Naga_Adarsh_Resume.pdf' };

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [progress, setProgress] = useState(0);

  // Reading-position bar. rAF-throttled, passive listener.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Highlight the section the reader is currently inside.
  useEffect(() => {
    const ids = ['top', ...NAV.map((item) => item.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="topbar" data-component="site-header">
      <div className="container">
        <div className="topbar-row">
          <a className="brand" href="#top">
            naga adarsh
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            <ul className="nav-list">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    className={`nav-link${active === item.id ? ' is-active' : ''}`}
                    href={item.href}
                    aria-current={active === item.id ? 'true' : undefined}
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
            <a className="cv-pill" href={RESUME.href} download={RESUME.download}>
              {RESUME.label}
            </a>
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
      </div>

      <nav className="menu-panel" id="menu-panel" aria-label="Mobile" data-component="nav-menu" hidden={!open}>
        <div className="container">
          <ul>
            {[...NAV, { id: 'cv', ...RESUME }].map((item) => (
              <li key={item.id}>
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
        </div>
      </nav>

      <div className="topbar-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}
