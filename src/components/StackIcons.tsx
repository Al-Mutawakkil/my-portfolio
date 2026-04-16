import StackIcon from 'tech-stack-icons';

const stack = [
  { name: 'react',        label: 'React' },
  { name: 'nextjs',       label: 'Next.js' },
  { name: 'typescript',   label: 'TypeScript' },
  { name: 'js',           label: 'JavaScript' },
  { name: 'flutter',      label: 'Flutter' },
  { name: 'gemini',       label: 'Gemini' },
  { name: 'nodejs',       label: 'Node.js' },
  { name: 'expressjs',    label: 'Express.js' },
  { name: 'go',           label: 'Go' },
  { name: 'python',       label: 'Python' },
  { name: 'astro',        label: 'Astro' },
  { name: 'tailwindcss',  label: 'Tailwind' },
  { name: 'figma',        label: 'Figma' },
  { name: 'postgresql',   label: 'PostgreSQL' },
  { name: 'supabase',     label: 'Supabase' },
  { name: 'neon',         label: 'Neon' },
  { name: 'railway',      label: 'Railway' },
] as const;

export default function StackIcons() {
  return (
    <div className="stack-tags">
      {stack.map(({ name, label }) => (
        <div key={name} className="stack-tag">
          <StackIcon name={name} style={{ width: 20, height: 20, flexShrink: 0 }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
