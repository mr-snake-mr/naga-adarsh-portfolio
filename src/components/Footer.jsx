import { Github, Linkedin, Mail } from 'lucide-react';
import { IconLink } from './ui';

export default function Footer() {
  return (
    <footer className="site-footer" id="contact" data-component="site-footer" aria-labelledby="contact-title">
      <div className="container">
        <p className="footer-label">contact</p>

        <a className="big-mail" id="contact-title" href="mailto:nagaadarsh354@gmail.com">
          email me → nagaadarsh354@gmail.com
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
            <a
              className="mono-link resume-link"
              href="/assets/resume.pdf"
              download="Naga_Adarsh_Resume.pdf"
            >
              résumé pdf ↓
            </a>
          </div>
          <p className="footer-close">chennai, in · class of 2027</p>
        </div>
      </div>
    </footer>
  );
}
