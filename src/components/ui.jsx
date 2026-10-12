// Shared UI primitives.

// Section heading: index chip + the element the section is built from +
// hairline rule on top, then the oversized title and its note.
// `id` is required so sections' aria-labelledby references actually resolve.
// `accent` names the element, so the chip colour and the printed word can
// never drift apart — there is only one value to change.
export function SectionHeading({ id, index, accent = 'fire', title, note }) {
  return (
    <div className="section-heading" data-component="section-heading">
      {(index || accent) && (
        <p className="eyebrow" data-accent={accent}>
          {index && (
            <span className="eyebrow-num" aria-hidden="true">
              {index}
            </span>
          )}
          {accent && (
            <span className="eyebrow-el" aria-hidden="true">
              {accent}
            </span>
          )}
          <span className="eyebrow-rule" aria-hidden="true" />
        </p>
      )}
      <h2 id={id}>{title}</h2>
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
