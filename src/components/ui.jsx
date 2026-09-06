// Shared UI primitives for the v2 sticker-wall system.

export function SectionHeading({ title, note }) {
  return (
    <div className="section-heading" data-component="section-heading">
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

export function IconLink({ href, label, children, text }) {
  if (text) {
    return (
      <a className="icon-link icon-text" href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <a className="icon-link" href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
