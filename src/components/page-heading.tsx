/**
 * @file Consistent editorial heading for the growing content sections.
 * @author meetbyte
 */
/**
 * Renders a consistent editorial page heading with an optional description and explicit sample notice.
 * @author meetbyte
 */
export function PageHeading({ eyebrow, title, description, sample = false }: { eyebrow: string; title: string; description: string; sample?: boolean }) {
  return <>
    <div className="section-topline"><span className="eyebrow">{eyebrow}</span><span className="topline-index">{sample ? "A PREVIEW OF WHAT’S NEXT" : "BUILT WITH INTENT"} <span aria-hidden="true">↗</span></span></div>
    <div className="detail-intro">
      <span className="detail-mark" aria-hidden="true">✳</span>
      <h1>{title}</h1><p className="detail-lead">{description}</p>
      {sample && <p className="sample-notice"><span className="content-badge">Sample content</span> Illustrative placeholders. Real work and writing will follow.</p>}
    </div>
  </>;
}
