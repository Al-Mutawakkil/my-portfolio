import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let scale = 1;
    let targetScale = 1;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const isInteractive = (el: Element | null): boolean => {
      while (el && el !== document.body) {
        const tag = el.tagName;
        if (tag === 'A' || tag === 'BUTTON' || (el as HTMLElement).getAttribute('role') === 'button') return true;
        el = el.parentElement;
      }
      return false;
    };

    const onOver = (e: MouseEvent) => {
      targetScale = isInteractive(e.target as Element) ? 2.4 : 1;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      scale += (targetScale - scale) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${scale})`;
      requestAnimationFrame(tick);
    };

    document.body.classList.add('has-cursor-fx');
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    const raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-cursor-fx');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"></div>
    </>
  );
}
