# Blog & Draft Management Design

**Date:** 2026-05-05
**Status:** Approved
**Project:** thufailadib.vercel.app

---

## Overview

Add a `/blog` page to the existing Astro portfolio at `thufailadib.vercel.app`. Posts document the author's learning journey across online courses (Dicoding, Anthropic), work agency projects, and personal explorations — combining structured learning notes and personal reflective essays.

Draft management is handled in Notion (existing tool). The portfolio blog is the canonical reading experience. Medium receives a manual copy of each published post.

---

## Architecture

```
my-portfolio/
├── src/
│   ├── content/
│   │   ├── config.ts              ← blog collection schema (Zod)
│   │   └── blog/
│   │       └── *.mdx              ← one file per post
│   ├── pages/
│   │   ├── index.astro            ← existing homepage (gets teaser section)
│   │   └── blog/
│   │       ├── index.astro        ← /blog listing page
│   │       └── [slug].astro       ← /blog/[slug] individual post
│   └── components/
│       ├── BlogCard.astro         ← card for the listing grid
│       └── TagFilter.tsx          ← client-side tag filter (React island)
└── public/
    └── blog/
        └── covers/                ← post cover images (jpg/webp)
```

---

## Content Schema

Each post is an `.mdx` file in `src/content/blog/` with the following frontmatter:

```yaml
title: string           # Post title
description: string     # One-line teaser shown on card
date: date              # Publication date (YYYY-MM-DD)
tags: string[]          # e.g. ["AI", "Hackathon", "Flutter"]
cover: string           # Path to cover image, e.g. /blog/covers/my-post.jpg
readTime: number        # Estimated read time in minutes (set manually)
draft: boolean          # true = excluded from build output
```

Cover images are stored in `public/blog/covers/`. Format: jpg or webp, recommended aspect ratio 16:9.

---

## Blog Listing Page (`/blog`)

- **Layout**: 3-column card grid (desktop), 2-column (tablet), 1-column (mobile)
- **Sort**: Chronological, newest first
- **Pagination**: None until 12+ posts exist
- **Tag filter**: Client-side React island (`TagFilter.tsx`). Clicking a tag filters visible cards with no page reload. "All" resets the filter. Active tag is visually highlighted.
- **Empty state**: When a filtered tag has no matching posts — "Nothing here yet — check back soon."

### Card contents
- Cover image (full width, 16:9, rounded top corners)
- First tag as a badge
- Title
- One-line description
- Date + read time

---

## Individual Post Page (`/blog/[slug]`)

### Layout (top to bottom)
1. **Back link** — "← All posts" pill button, returns to `/blog`
2. **Cover image** — full width, rounded, real uploaded image
3. **Tags** — all tags as uniform neutral pills (`#ece9e3` background, muted text, no highlighting)
4. **Title** — Bricolage Grotesque, large
5. **Meta row** — date · read time · source (e.g. "Anthropic Course")
6. **Post body** — rendered MDX inside a white card with rounded corners. Styles for: paragraphs, headings (h2/h3), blockquotes (coral left border), inline code, code blocks.
7. **Footer** — handwriting "Thanks for reading ✦" on the left, "Also on Medium →" pill link on the right

---

## Navigation & Portfolio Integration

- **Nav**: Add "Blog" link to `Nav.astro`, same style as existing nav items
- **Homepage**: Add a "Latest posts" teaser section near the bottom of `index.astro` — shows 3 most recent non-draft posts as cards, with "See all posts →" link to `/blog`
- **Footer**: Add "Blog" link to the existing footer link group

---

## Publishing Workflow

1. Write and organise drafts in Notion (existing database with Status, Source, Tags, Target fields)
2. When a post reaches "Ready" status in Notion:
   - Create `src/content/blog/your-post-slug.mdx`
   - Add cover image to `public/blog/covers/`
   - Set `draft: false` in frontmatter
   - Commit and push to main branch
   - Vercel deploys automatically
3. Copy the same content manually to Medium

---

## Technical Notes

- Requires `@astrojs/mdx` integration (official Astro package, one install command)
- Tag filter uses an Astro React island (`client:load`) — the rest of the page remains static
- No CMS, no external API, no auth — fully static output
- `.superpowers/` should be added to `.gitignore`
