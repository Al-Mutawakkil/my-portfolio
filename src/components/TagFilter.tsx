import { useState } from 'react';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string;
  readTime: number;
}

interface Props {
  posts: Post[];
  allTags: string[];
}

function BlogEmptyAll() {
  return (
    <div className="blog-empty-all">
      <div className="blog-empty-icon" aria-hidden="true">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="8" width="48" height="56" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="12" y="8" width="10" height="56" rx="5 0 0 5" fill="currentColor" opacity="0.12" />
          <line x1="28" y1="26" x2="50" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
          <line x1="28" y1="34" x2="50" y2="34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
          <line x1="28" y1="42" x2="42" y2="42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
          <circle cx="55" cy="56" r="10" fill="var(--coral)" />
          <line x1="55" y1="51" x2="55" y2="61" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="56" x2="60" y2="56" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="blog-empty-heading">Nothing published yet</h3>
      <p className="blog-empty-sub">I'm writing — come back soon.</p>
    </div>
  );
}

function BlogEmptyTag({ tag }: { tag: string }) {
  return (
    <div className="blog-empty-tag">
      <span className="blog-empty-tag-icon" aria-hidden="true">✦</span>
      <p>No posts tagged <strong>{tag}</strong> yet.</p>
    </div>
  );
}

export default function TagFilter({ posts, allTags }: Props) {
  const [activeTag, setActiveTag] = useState('All');

  const visible = activeTag === 'All'
    ? posts
    : posts.filter((p) => p.tags.includes(activeTag));

  if (posts.length === 0) {
    return <BlogEmptyAll />;
  }

  return (
    <div>
      <div className="tag-filter-row">
        {['All', ...allTags].map((tag) => (
          <button
            key={tag}
            className={`tag-filter-pill${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <BlogEmptyTag tag={activeTag} />
      ) : (
        <div className="blog-grid">
          {visible.map((post) => {
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              year: 'numeric',
            }).format(new Date(post.date));

            return (
              <a href={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
                <div className="blog-card-cover">
                  <img src={post.cover} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card-body">
                  {post.tags[0] && (
                    <span className="blog-card-tag">{post.tags[0]}</span>
                  )}
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-desc">{post.description}</p>
                  <div className="blog-card-meta">
                    <span>{formattedDate}</span>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
