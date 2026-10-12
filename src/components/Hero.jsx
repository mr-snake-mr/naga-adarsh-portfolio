const PATENT = 'https://drive.google.com/file/d/1-oCO61LDZnqCTJXcOmF623QZO5dA4dUV/view';

const STACK = [
  { label: 'languages', items: 'python · java · sql · javascript' },
  { label: 'ai/ml & cv', items: 'tensorflow · keras · opencv' },
  { label: 'backend', items: 'fastapi · flask · redis · mysql' },
  { label: 'tooling', items: 'docker · git · linux' },
];

// The 30-second scan. Same facts as before, but laid out as a data panel so it
// can hold the right column level with the name instead of dangling as a row.
// Four receipts, four different elements — the one place in the page where
// more than two pigments sit next to each other on purpose.
const RECEIPTS = [
  { label: 'patent', value: 'IN202641004962 A1', href: PATENT, accent: 'light' },
  { label: 'sih', value: 'finalist ×2', accent: 'fire' },
  { label: 'leetcode', value: '670+ solved', href: 'https://leetcode.com/naga_adarsh_s', accent: 'water' },
  { label: 'codechef', value: '1700+ rating', href: 'https://www.codechef.com/users/mr_snake_mr', accent: 'wind' },
];

export default function Hero() {
  return (
    <section className="hero" id="top" data-component="hero" aria-labelledby="hero-title">
      <div className="container">
        {/* masthead band: the availability claim appears here and only here */}
        <div className="hero-meta">
          <span className="hero-status">
            <i className="status-dot" aria-hidden="true" />
            open to internships
          </span>
          <span className="hero-meta-line">chennai, in · class of 2027</span>
        </div>

        <div className="hero-grid">
          <div className="hero-main">
            <h1 className="hero-name" id="hero-title">
              <span className="line">naga</span>{' '}
              <span className="line">
                <span className="mark">adarsh</span>
              </span>
            </h1>

            <p className="hero-lead">
              Final-year IT undergrad in Chennai. I build computer-vision and
              backend systems that actually run — a freshness detector published
              as an Indian patent application, a search engine for research
              papers, and a URL shortener that stays out of your way.
            </p>

            <div className="hero-actions">
              <a className="btn btn-fire" href="#work">
                see the projects ↓
              </a>
              <a className="btn btn-water" href="mailto:nagaadarsh354@gmail.com">
                email me →
              </a>
            </div>
          </div>

          <aside className="hero-side" aria-label="Tools and verifiable credentials">
            <div className="spec-card el-earth" data-el="earth">
              <p className="spec-head">toolbox</p>
              <dl className="spec-rows">
                {STACK.map((line) => (
                  <div className="spec-row" key={line.label}>
                    <dt>{line.label}</dt>
                    <dd>{line.items}</dd>
                  </div>
                ))}
              </dl>
              <a
                className="spec-link"
                href="https://github.com/mr-snake-mr"
                target="_blank"
                rel="noopener noreferrer"
              >
                all code on github ↗
              </a>
            </div>

            <div className="receipt-block">
              <p className="receipt-block-title">receipts</p>
              <ul className="receipt-list">
                {RECEIPTS.map((item) => (
                  <li
                    className="receipt-strip"
                    key={item.label}
                    style={{
                      /* the row's whole family, so every part of it is one element */
                      '--rc': `var(--${item.accent})`,
                      '--rcw': `var(--${item.accent}-wash)`,
                      '--rc-ink': `var(--${item.accent}-ink)`,
                      '--rc-shadow': `var(--${item.accent}-shadow)`,
                    }}
                  >
                    <span className="receipt-label">{item.label}</span>
                    {item.href ? (
                      <a
                        className="receipt-value"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.value} ↗
                      </a>
                    ) : (
                      <span className="receipt-value">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="receipt-note">
                previously — web developer, Eagle Hi-Tech Softclou · freelance
                site build for SubbaiH Tuition &amp; Daycare
              </p>
            </div>
          </aside>
        </div>

        <p className="soul-line">
          every claim below is a link you can open and check.
        </p>
      </div>
    </section>
  );
}
