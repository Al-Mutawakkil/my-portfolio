import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  loop?: boolean;
  className?: string;
}

export default function TextType({
  texts,
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = '_',
  cursorBlinkDuration = 0.5,
  loop = true,
  className,
}: TextTypeProps) {
  const [displayText, setDisplayText] = useState('');
  const cursorRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef({
    textIndex: 0,
    charIndex: 0,
    isDeleting: false,
    done: false,
  });

  useEffect(() => {
    if (!cursorRef.current || !showCursor) return;
    const tl = gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: cursorBlinkDuration,
      ease: 'steps(1)',
    });
    return () => { tl.kill(); };
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    const s = stateRef.current;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const current = texts[s.textIndex];

      if (s.isDeleting) {
        s.charIndex--;
        setDisplayText(current.slice(0, s.charIndex));

        if (s.charIndex === 0) {
          s.isDeleting = false;
          s.textIndex = (s.textIndex + 1) % texts.length;
          if (!loop && s.textIndex === 0) {
            s.done = true;
            return;
          }
          timeoutId = setTimeout(tick, pauseDuration / 3);
          return;
        }
        timeoutId = setTimeout(tick, deletingSpeed);
      } else {
        s.charIndex++;
        setDisplayText(current.slice(0, s.charIndex));

        if (s.charIndex === current.length) {
          // If only one text and not looping, just stop here
          if (!loop && texts.length === 1) return;
          s.isDeleting = true;
          timeoutId = setTimeout(tick, pauseDuration);
          return;
        }
        timeoutId = setTimeout(tick, typingSpeed);
      }
    }

    timeoutId = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [texts, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span ref={cursorRef} aria-hidden="true">
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
