/**
 * @file Static article with readable, sanitized Markdown.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { SiteImage as Image } from "@/components/site-image";
import { notFound } from "next/navigation";
import { getPosts, getPost, formatPostDate } from "@/lib/content/posts";
import { pageMetadata } from "@/lib/metadata";
import { isPageEnabled } from "@/lib/page-visibility";
import { requirePageEnabled } from "@/lib/require-page-enabled";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
/**
 * Builds published article parameters when Blog is enabled; returns the reserved recovery slug for an empty export.
 * @author meetbyte
 */
export async function generateStaticParams() {
  const params = isPageEnabled("blog") ? (await getPosts()).map(({ slug }) => ({ slug })) : [];
  // Static export requires one parameter. This reserved slug always renders 404.
  return params.length ? params : [{ slug: "_unpublished" }];
}
/**
 * Resolves an enabled article and derives its canonical, publication date, tags and sample indexing metadata.
 * @author meetbyte
 */
export async function generateMetadata({ params }: Props) {
  requirePageEnabled("blog");
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return pageMetadata(post.title, post.excerpt, `/blog/${post.slug}/`, { sample: post.placeholder, article: true, date: post.date, tags: post.tags });
}
/**
 * Renders validated article metadata, optional cover and sanitized HTML, or returns the route not-found state.
 * @author meetbyte
 */
export default async function Article({ params }: Props) {
  requirePageEnabled("blog");
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return <article className="detail-page blog-article">
    <div className="section-topline"><Link className="back-link" href="/blog/">← All notes</Link><span className="eyebrow">ON THE LEARNING CURVE</span></div>
    <header className="detail-intro"><div className="article-meta"><time dateTime={post.date}>{formatPostDate(post.date)}</time><span>{post.minutes} min read</span></div><h1>{post.title}</h1><p className="detail-lead">{post.excerpt}</p>
      <ul className="tag-list" aria-label="Article tags">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      {post.placeholder && <p className="sample-notice"><span className="content-badge">Sample article</span> Placeholder writing demonstrating the article format.</p>}
    </header>
    {post.cover && <figure className="article-cover"><Image src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height} /></figure>}
    {/* HTML comes only from the sanitized build-time content adapter. */}
    <div className="article-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    <div className="detail-section"><Link className="text-link" href="/blog/">← Back to all notes</Link></div>
  </article>;
}
