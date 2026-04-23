import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Brief chat',
    description: "We talk through your idea, what you need, what the timeline looks like, and whether we're a good fit.",
  },
  {
    number: '02',
    title: 'Proposal & timeline',
    description: 'You get a clear scope, fixed timeline, and a price. No surprises, no scope creep.',
  },
  {
    number: '03',
    title: 'Build & ship',
    description: "I build fast, keep you updated, and deliver something real. No hand-holding needed on your end.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>('.hiw-node', section);
      const texts = gsap.utils.toArray<HTMLElement>('.hiw-text', section);
      const lineFills = gsap.utils.toArray<HTMLElement>('.hiw-line-fill', section);
      const isMobile = window.innerWidth <= 768;

      gsap.set(nodes, { opacity: 0, y: 20 });
      gsap.set(texts, { opacity: 0, y: 20 });
      gsap.set(lineFills, isMobile ? { scaleY: 0 } : { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });

      tl.to(nodes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.3,
      });

      tl.to(texts, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.3,
      }, '<');

      nodes.forEach((node, i) => {
        tl.call(() => node.classList.add('hiw-node--filled'), undefined, i * 0.3 + 0.15);
      });

      tl.to(lineFills, {
        [isMobile ? 'scaleY' : 'scaleX']: 1,
        duration: 0.5,
        ease: 'none',
        stagger: 0.4,
      }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef}>
      <div className="reveal">
        <span className="section-tag tag-services">✦ Process</span>
        <h2 className="section-heading">How it works</h2>
      </div>
      <div className="hiw-steps">
        {steps.map((step, i) => (
          <div className="hiw-step" key={step.number}>
            <div className="hiw-node-area">
              <div className="hiw-node">{step.number}</div>
              {i < steps.length - 1 && (
                <div className="hiw-line">
                  <div className="hiw-line-fill" />
                </div>
              )}
            </div>
            <div className="hiw-text">
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
