import { pageEyebrow } from "@/lib/page-label";
import { routes } from "@/constants/routes";
/**
 * @file Normalized post listing; no filesystem knowledge in the UI.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { PageHeading } from "@/components/page-heading";
import { Icon } from "@/components/icons";
import { getPosts, formatPostDate } from "@/lib/content/posts";
import { pageMetadata } from "@/lib/metadata";
import { requirePageEnabled } from "@/lib/require-page-enabled";
export const metadata = pageMetadata("Blog", "Notes on engineering, learning and ideas worth returning to.", "/blog/");
/**
 * Renders the enabled blog listing from validated published posts, including sample notices and the empty state.
 * @author meetbyte
 */
export default async function Blog() {
  requirePageEnabled("blog");
  const posts = await getPosts();
  return <div className="detail-page">
    <PageHeading eyebrow={pageEyebrow(routes.blog, "BLOG")} title="Notes from the learning curve." description="Engineering, questions and small discoveries. A place to think things through." sample={posts.length > 0 && posts.every((post) => post.placeholder)} />
    <div className="post-list">
      {posts.length === 0 && <p className="detail-empty">The first notes are being prepared. Please check back soon.</p>}
      {posts.map((post) => <article className="post-card" key={post.slug}>
        <div className="card-meta"><time dateTime={post.date}>{formatPostDate(post.date)}</time><span>{post.minutes} min read</span>{post.placeholder && <span className="content-badge">Sample article</span>}</div>
        <h2><Link href={`/blog/${post.slug}/`}>{post.title}<Icon name="arrow" size={22} /></Link></h2>
        <p>{post.excerpt}</p>
        <ul className="tag-list" aria-label="Article tags">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <Link className="text-link" href={`/blog/${post.slug}/`}>Read article <Icon name="arrow" size={16} /><span className="sr-only">: {post.title}</span></Link>
      </article>)}
    </div>
  </div>;
}
