import { SectionHeading } from './ui';

export default function ClientWork() {
  return (
    <section className="section" id="client" data-component="client-strip" aria-labelledby="client-title">
      <div className="container">
        <SectionHeading title="experience & college" />

        <div className="client-grid">
          <article className="client-panel panel-tang" data-component="client-panel">
            <span className="when">sep 2025 — oct 2025 · freelance</span>
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

          <article className="client-panel panel-lime" data-component="client-panel">
            <span className="when">jun 2025 — jul 2025 · chennai</span>
            <h3>Web Developer — Eagle Hi-Tech Softclou Pvt Ltd</h3>
            <ul className="points">
              <li>
                Worked directly with clients to gather requirements and build 3
                custom web pages — 2 responsive HTML5/CSS3 sites and 1 dynamic
                React.js web page.
              </li>
              <li>
                Engineered responsive, cross-browser user interfaces using React
                components, state management and modern CSS layout techniques.
              </li>
              <li>
                Delivered end-to-end web solutions on schedule, prioritizing
                clean component architecture, fast load times and intuitive
                UI/UX based on direct client feedback.
              </li>
            </ul>
            <div className="facts">
              <span className="fact">react.js</span>
              <span className="fact">html5 · css3</span>
              <span className="fact">javascript</span>
              <span className="fact">responsive web design</span>
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
