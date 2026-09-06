import { SectionHeading } from './ui';

export default function ClientWork() {
  return (
    <section className="section" id="client" data-component="client-strip" aria-labelledby="client-title">
      <div className="container">
        <SectionHeading title="freelance & college" />

        <div className="client-grid">
          <article className="client-panel panel-tang" data-component="client-panel">
            <span className="when">2025 · freelance</span>
            <h3>SubbaiH Tuition & Daycare</h3>
            <p className="body">
              A tuition and daycare centre in Chennai hired me through a college
              referral to build their website — a responsive multi-page site
              (home, about, services, blog, contact). Shipped for a ₹10,000
              paid engagement.
            </p>
            <div className="card-links">
              <a
                className="text-link"
                href="https://drive.google.com/file/d/1pUfP7mcnX1AhtBRK5o1q-XyZDtyGZ6cA/view"
                target="_blank"
                rel="noopener noreferrer"
              >
                see the project documentation →
              </a>
            </div>
            <div className="facts">
              <span className="fact">html · css · javascript</span>
              <span className="fact">responsive</span>
              <span className="fact">static hosting</span>
            </div>
          </article>

          <article className="client-panel panel-teal" data-component="client-panel">
            <span className="when">2023 — 2027</span>
            <h3>B.Tech — Information Technology</h3>
            <p className="body">
              Easwari Engineering College, Chennai. Most of my projects and
              coursework sit in the AI/ML and backend space, with data
              structures and system design as the base.
            </p>
            <div className="facts">
              <span className="fact">CGPA 8.3/10</span>
              <span className="fact">chennai, in</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
