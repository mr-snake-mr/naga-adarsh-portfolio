import { SectionHeading } from './ui';

const PROJECTS = [
  {
    numeral: '01',
    accent: 'a-tang',
    title: 'Real-Time Freshness Indicator',
    href: 'https://github.com/mr-snake-mr/Real-Time-Freshness-Indicator',
    story: 'Point a camera at fruit and vegetables, and it scores how fresh they are in real time — before the spoilage spreads.',
    done: [
      'Fine-tuned a MobileNetV2 CNN and served it through a Flask pipeline',
      'Added decay modelling so the score changes over time and raises alerts',
    ],
    pill: '92% accuracy · 3,000+ images',
    links: [
      { label: 'view code', href: 'https://github.com/mr-snake-mr/Real-Time-Freshness-Indicator' },
      { label: 'live demo', href: 'https://kishore200630-freshness-indicator.hf.space' },
      { label: 'patent IN202641004962 A1', href: 'https://drive.google.com/file/d/1-oCO61LDZnqCTJXcOmF623QZO5dA4dUV/view' },
    ],
    tags: ['python', 'tensorflow', 'react'],
  },
  {
    numeral: '02',
    accent: 'a-teal',
    title: 'Scholar RAG Engine',
    href: 'https://github.com/mr-snake-mr/scholar-rag-engine',
    story: 'Ask a research question in plain language, get an answer drawn from papers and pages you chose.',
    done: [
      'FAISS vector search with ColBERT late-interaction retrieval for low-latency lookup',
      'FastAPI backend with cross-encoder reranking and Gemini for final answers',
    ],
    pill: '+30–40% answer precision',
    links: [
      { label: 'view code', href: 'https://github.com/mr-snake-mr/scholar-rag-engine' },
      { label: 'live demo', href: 'https://snakeeee-scholar-rag-engine.hf.space', note: '(demo may cold-boot)' },
    ],
    tags: ['python', 'faiss', 'colbert'],
  },
  {
    numeral: '03',
    accent: 'a-lime',
    title: 'Nag-Link Shortener',
    href: 'https://github.com/mr-snake-mr/nag-shortener',
    story: 'A URL shortener with custom slugs — paste a long link, get a short one that redirects fast.',
    done: [
      'Serverless edge functions handle the redirect path',
      'Upstash Redis caching cut lookup time by ~60%',
    ],
    pill: '<100 ms redirects',
    links: [
      { label: 'view code', href: 'https://github.com/mr-snake-mr/nag-shortener' },
      { label: 'live demo', href: 'https://nagssho.vercel.app' },
    ],
    tags: ['next.js', 'typescript', 'redis'],
  },
];

export default function Projects() {
  return (
    <section className="section" id="work" data-component="work-showcase" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading title="my projects" note="Three things I built end to end, with the numbers they actually hit." />

        <div className="work-grid">
          {PROJECTS.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.numeral} data-component="project-card">
              <span className="card-numeral">{project.numeral}</span>

              <h3>
                <a href={project.href} target="_blank" rel="noopener noreferrer">{project.title}</a>
              </h3>

              <p className="card-story">{project.story}</p>

              <ul className="card-done">
                {project.done.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <span className="card-pill">{project.pill}</span>

              <div className="card-links">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    className="text-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} →
                  </a>
                ))}
                {project.links.some((l) => l.note) && (
                  <span className="link-note">live demo may cold-boot</span>
                )}
              </div>

              <div className="card-tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
