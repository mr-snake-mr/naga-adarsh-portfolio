const STACK = [
  { label: 'languages', items: 'python · java · sql · javascript' },
  { label: 'ai/ml & cv', items: 'tensorflow · keras · opencv' },
  { label: 'backend', items: 'fastapi · flask · redis · mysql' },
  { label: 'tooling', items: 'docker · git · linux' },
];

export default function Hero() {
  return (
    <section className="hero" id="top" data-component="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="deco-row">
          <p className="greeting">hi, i'm · chennai, in · class of 2027</p>
          <span className="deco-squares" aria-hidden="true">
            <i /><i /><i />
          </span>
        </div>

        <div className="hero-grid">
          <div className="hero-main">
            <h1 className="hero-name" id="hero-title">
              <span className="line">naga</span>
              <span className="line"><span className="mark">adarsh</span></span>
            </h1>

            <p className="hero-value">
              I'm a final-year IT student in Chennai who builds computer-vision
              and backend systems — including a patent-filed freshness detector
              and a search engine for research papers. The stuff below is real:
              I built it, ran it, and some of it is even documented.
            </p>

            <div className="hero-actions">
              <a className="btn btn-lime" href="#work">see the projects ↓</a>
              <a className="btn btn-paper" href="mailto:nagaadarsh354@gmail.com">email me →</a>
            </div>
          </div>

          <aside className="hero-side" aria-label="Tools and languages I use">
            <div className="side-card">
              <p className="side-tag">toolbox</p>
              {STACK.map((line) => (
                <p className="stack-line" key={line.label}>
                  <strong>{line.label}</strong> — {line.items}
                </p>
              ))}
              <div className="side-links">
                <a className="text-link" href="https://github.com/mr-snake-mr" target="_blank" rel="noopener noreferrer">all code on github ↗</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
