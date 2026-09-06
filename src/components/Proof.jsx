import { SectionHeading } from './ui';

const BADGES = [
  {
    tag: 'hackathon',
    title: 'Smart India Hackathon — college-level finalist, 2024 & 2025',
    cls: 'b-tang',
    tilt: 'tilt-l',
  },
  {
    tag: 'certification',
    title: 'Microsoft Certified: Azure Developer Associate',
    cls: 'b-teal',
    href: 'https://learn.microsoft.com/api/credentials/share/en-us/NagaAdarsh-7898/699D12D414C38A62',
    tilt: 'tilt-r',
  },
  {
    tag: 'certification',
    title: 'Cisco CCNA 1 · 2 · 3',
    cls: 'b-sand',
  },
];

const PROFILES = [
  { value: '670+', cap: 'problems solved on LeetCode', href: 'https://leetcode.com/naga_adarsh_s', cls: 'tile-tang', label: '670+ LeetCode problems' },
  { value: '1700+', cap: 'CodeChef rating, division 2', href: 'https://www.codechef.com/users/mr_snake_mr', cls: 'tile-teal', label: '1700+ CodeChef rating' },
  { value: '750+', cap: 'problems tracked on Codolio', href: 'https://codolio.com/profile/fOaTXef', cls: 'tile-lime', label: '750+ problems on Codolio' },
];

const REPOS = [
  { name: 'smart-recommender-api', what: 'a recommendation API for products', links: [{ label: 'code', href: 'https://github.com/mr-snake-mr/smart-recommender-api' }] },
  { name: 'telemetry', what: 'a small telemetry dashboard project', links: [{ label: 'code', href: 'https://github.com/mr-snake-mr/telemetry' }, { label: 'live demo', href: 'https://telemetry-black.vercel.app' }] },
  { name: 'cf_ai_freshness_assistant', what: 'a Cloudflare-side experiment around the freshness model', links: [{ label: 'code', href: 'https://github.com/mr-snake-mr/cf_ai_freshness_assistant' }] },
];

export default function Proof() {
  return (
    <section className="section" id="proof" data-component="proof" aria-labelledby="proof-title">
      <div className="container">
        <SectionHeading title="credentials" note="Certs, contest finals and coding scores — the links go to the real thing." />

        <div className="badges" data-component="proof-badges">
          {BADGES.map((badge) => (
            badge.href ? (
              <a
                key={badge.title}
                className={`badge ${badge.cls} ${badge.tilt || ''}`}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                data-component="badge"
              >
                <span className="b-tag">{badge.tag}</span>
                <span className="b-title">{badge.title}</span>
              </a>
            ) : (
              <div
                key={badge.title}
                className={`badge ${badge.cls} ${badge.tilt || ''}`}
                data-component="badge"
              >
                <span className="b-tag">{badge.tag}</span>
                <span className="b-title">{badge.title}</span>
              </div>
            )
          ))}
        </div>

        <p className="mini-label">competitive programming</p>
        <div className="stat-grid" data-component="stat-grid" aria-label="Coding profile numbers">
          {PROFILES.map((profile) => (
            <a
              key={profile.cap}
              className={`stat-tile ${profile.cls}`}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={profile.label}
            >
              <span className="stat-value">{profile.value}</span>
              <span className="stat-cap">{profile.cap}</span>
            </a>
          ))}
        </div>

        <p className="mini-label">more on github</p>
        <ul className="repo-list">
          {REPOS.map((repo) => (
            <li key={repo.name}>
              <a className="repo-name" href={repo.links[0].href} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <span className="repo-what">{repo.what}</span>
              <span className="repo-links">
                {repo.links.map((link) => (
                  <a className="text-link" key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} →
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
