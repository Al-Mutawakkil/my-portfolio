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

export default function TagFilter({ posts, allTags }: Props) {
  const [activeTag, setActiveTag] = useState('All');

  const visible = activeTag === 'All'
    ? posts
    : posts.filter((p) => p.tags.includes(activeTag));

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
        <p className="tag-empty">Nothing here yet — check back soon.</p>
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
