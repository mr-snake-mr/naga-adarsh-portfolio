import { Github, Linkedin, Mail } from 'lucide-react';
import { IconLink } from './ui';

// Keep in step with TopBar: same file, same cache-buster.
const RESUME = { href: '/assets/resume.pdf?v=2026-10-12', download: 'Naga_Adarsh_Resume.pdf' };

export default function Footer() {
  return (
    <footer className="site-footer" id="contact" data-component="site-footer" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow eyebrow-inverse">
          <span className="eyebrow-num" aria-hidden="true">05</span>
          <span className="eyebrow-rule" aria-hidden="true" />
        </p>

        <h2 className="footer-title" id="contact-title">let's build something</h2>

        <a className="big-mail" href="mailto:nagaadarsh354@gmail.com">
          nagaadarsh354@gmail.com<span className="big-mail-arrow" aria-hidden="true">→</span>
        </a>

        <p className="footer-meta">
          open to internships &amp; placement roles · phone +91 90031 92319
        </p>

        <div className="footer-row">
          <div className="icon-links">
            <IconLink href="https://github.com/mr-snake-mr" label="GitHub profile (opens in new tab)">
              <Github size={20} strokeWidth={1.8} />
            </IconLink>
            <IconLink href="https://linkedin.com/in/naga-adarsh" label="LinkedIn profile (opens in new tab)">
              <Linkedin size={20} strokeWidth={1.8} />
            </IconLink>
            <IconLink href="mailto:nagaadarsh354@gmail.com" label="Email nagaadarsh354@gmail.com">
              <Mail size={20} strokeWidth={1.8} />
            </IconLink>
            <IconLink text href="https://www.codechef.com/users/mr_snake_mr" label="CodeChef profile (opens in new tab)">
              cc
            </IconLink>
            <IconLink text href="https://leetcode.com/naga_adarsh_s" label="LeetCode profile (opens in new tab)">
              lc
            </IconLink>
            <IconLink text href="https://codolio.com/profile/fOaTXef" label="Codolio profile (opens in new tab)">
              cd
            </IconLink>
            <a className="mono-link resume-link" href={RESUME.href} download={RESUME.download}>
              résumé pdf ↓
            </a>
          </div>

          <div className="footer-end">
            <p className="footer-close">chennai, in · class of 2027 · nag.is-a.dev</p>
            <a className="to-top" href="#top">back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
