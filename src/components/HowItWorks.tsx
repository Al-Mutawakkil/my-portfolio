const steps = [
  {
    number: '01',
    title: 'Scope the build',
    duration: '30 min',
    description: "We talk through the idea, what's already clear, what still needs shaping, and whether I'm the right fit.",
    deliverable: 'Clear direction and next-step fit check',
  },
  {
    number: '02',
    title: 'Lock the plan',
    duration: '1-2 days',
    description: 'You get the scope, timeline, deliverables, and price before the build starts. No vague promises.',
    deliverable: 'Fixed scope, timeline, and quote',
  },
  {
    number: '03',
    title: 'Build & ship',
    duration: 'Sprint-based',
    description: 'I build fast, share working previews, handle feedback, and get the product ready for real users.',
    deliverable: 'Production-ready launch',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="reveal">
        <span className="section-tag tag-services">✦ Process</span>
        <h2 className="section-heading">How it works</h2>
        <p className="section-sub">
          Simple enough to move quickly, structured enough that you always know what's happening.
        </p>
      </div>

      <div className="process-card-grid">
        {steps.map((step) => (
          <article className="process-card reveal" key={step.number}>
            <div className="process-card-top">
              <span>{step.number}</span>
              <small>{step.duration}</small>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <strong>{step.deliverable}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
