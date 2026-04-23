import { useState, useEffect, useRef, useCallback } from 'react';
import StackIcon from 'tech-stack-icons';

const experience = [
  {
    company: 'Etalas',
    companyUrl: 'https://etalas.com',
    role: 'Full-Stack Product Engineer',
    start: 'Jul 2022',
    end: 'Present',
    current: true,
    description:
      'Shipping full-stack web, mobile, and Go backend work across fintech, hospitality, and booking platforms.',
  },
];

const stack = [
  { name: 'react', label: 'React' },
  { name: 'nextjs', label: 'Next.js' },
  { name: 'typescript', label: 'TypeScript' },
  { name: 'js', label: 'JavaScript' },
  { name: 'flutter', label: 'Flutter' },
  { name: 'gemini', label: 'Gemini' },
  { name: 'nodejs', label: 'Node.js' },
  { name: 'expressjs', label: 'Express.js' },
  { name: 'go', label: 'Go' },
  { name: 'python', label: 'Python' },
  { name: 'astro', label: 'Astro' },
  { name: 'tailwindcss', label: 'Tailwind' },
  { name: 'figma', label: 'Figma' },
  { name: 'postgresql', label: 'PostgreSQL' },
  { name: 'supabase', label: 'Supabase' },
  { name: 'neon', label: 'Neon' },
  { name: 'railway', label: 'Railway' },
] as const;

const slides = [
  '/images/blue_selfie.jpg',
  '/images/runner_surakarta.jpg',
  '/images/cyclist_aeon.jpg',
  '/images/runner_aeon.jpg',
  '/images/trail_mt_gede.jpg',
];

const INTERVAL = 8000;

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = experience.find((e) => e.current) ?? experience[0];
  const previously = experience.filter((e) => e !== current);
  const hasMultipleSlides = slides.length > 1;

  const startCarousel = useCallback(() => {
    if (!hasMultipleSlides || intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
  }, [hasMultipleSlides]);

  const stopCarousel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!flipped) {
      startCarousel();
    } else {
      stopCarousel();
    }
    return stopCarousel;
  }, [flipped, startCarousel, stopCarousel]);

  // Pause when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden || flipped) {
        stopCarousel();
      } else {
        startCarousel();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [flipped, startCarousel, stopCarousel]);

  const handleFlip = () => setFlipped((f) => !f);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className={`flip-card${flipped ? ' flipped' : ''}`}
      tabIndex={0}
      role="button"
      aria-label="Click to flip card and see skills and experience"
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
    >
      <div className="flip-card-inner">
        {/* ── FRONT: Photo Carousel ── */}
        <div className="flip-card-front">
          <div className="carousel">
            {slides.length === 0 ? (
              /* Placeholder when no images are added yet */
              <div className="carousel-slide active">
                <div
                  className="slide-placeholder"
                  style={{
                    background:
                      'linear-gradient(145deg, var(--lavender), var(--mint))',
                  }}
                >
                  <div className="slide-placeholder-icon">📷</div>
                  <div className="slide-placeholder-label">Photo coming soon</div>
                </div>
              </div>
            ) : (
              slides.map((src, i) => (
                <div
                  key={src}
                  className={`carousel-slide${i === currentSlide ? ' active' : ''}`}
                >
                  <img src={src} alt={`Photo ${i + 1}`} loading="lazy" />
                </div>
              ))
            )}

            {hasMultipleSlides && (
              <div className="carousel-dots">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`carousel-dot${i === currentSlide ? ' active' : ''}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flip-hint">
            <span className="flip-hint-icon">↻</span>
            Flip to know more
          </div>
        </div>

        {/* ── BACK: Experience + Skills ── */}
        <div className="flip-card-back">
          <div className="back-flip-hint" aria-label="Flip back to photo">
            ↻
          </div>

          {/* Work Experience */}
          <div>
            <div className="exp-label-row">
              <span className="stack-label">Work Experience</span>
              {current.current && (
                <span className="live-badge">
                  <span className="live-dot" /> Currently
                </span>
              )}
            </div>
            {current.companyUrl ? (
              <a
                href={current.companyUrl}
                className="hero-company"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {current.company}
                <span className="hero-company-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <div className="hero-company">{current.company}</div>
            )}
            <div className="hero-meta">
              <span className="hero-role">{current.role}</span>
              <span className="hero-sep">·</span>
              <span className="hero-dates">
                {current.start} — {current.end}
              </span>
            </div>
            <p className="hero-desc">{current.description}</p>

            {previously.length > 0 && (
              <div className="previously">
                <div className="previously-label">Previously</div>
                {previously.map((p) => (
                  <div key={p.company} className="prev-entry">
                    <span className="prev-company">{p.company}</span>
                    <span className="prev-sep">·</span>
                    <span className="prev-role">{p.role}</span>
                    <span className="prev-dates">
                      {p.start} — {p.end}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="card-divider" />

          {/* Tech Stack */}
          <div>
            <span className="stack-label">What I work with</span>
            <div className="stack-tags" style={{ marginTop: '0.75rem' }}>
              {stack.map(({ name, label }) => (
                <div key={name} className="stack-tag">
                  <StackIcon
                    name={name}
                    style={{ width: 18, height: 18, flexShrink: 0 }}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
