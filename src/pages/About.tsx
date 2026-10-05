import Seo from '../components/ui/Seo'
import SectionHeading from '../components/ui/SectionHeading'
import Tag from '../components/ui/Tag'
import Timeline from '../components/ui/Timeline'
import { timeline } from '../data/timeline'

const stackGroups = [
  { label: 'Languages', items: ['Java', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  { label: 'Frontend', items: ['React', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Backend', items: ['Node.js', 'Express.js'] },
  { label: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render'] },
]

const values = ['Build consistently.', 'Keep learning.', 'Simplicity over complexity.', 'Stay curious.']

const funFacts = [
  'Most of my ideas come while walking with headphones.',
  'I enjoy writing as much as coding.',
  "I'm always working on something new, even if it's small.",
]

export default function About() {
  return (
    <>
      <Seo title="About" description="The story, values, and stack behind Yukti Sahu's work." />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        <p className="catalog-tab mb-4">File No. 010 — About</p>
        <h1 className="text-4xl sm:text-5xl font-medium leading-tight mb-6">
          MCA student and software developer.
        </h1>
        <p className="drop-cap text-lg text-ink/80 dark:text-nightpaper/80">
          I'm Yukti Sahu, based in India. I enjoy building full-stack web applications, learning
          new technologies, and turning ideas into useful products. Alongside coding, I write
          about personal growth, psychology, and everyday observations on{' '}
          <a href="https://medium.com/@Yuktisahu345" className="link-underline">
            Medium
          </a>
          . I cracked TCS through on-campus placement, and right now I'm working as a Data Tester
          Analyst, learning every day and making the most of my time.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10">
        <SectionHeading eyebrow="File No. 011 — Timeline" title="How I got here" />
        <Timeline entries={timeline} />
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10">
        <SectionHeading eyebrow="File No. 012 — Values" title="What I optimize for" />
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <div key={v} className="index-card p-5">
              <p className="text-ink/85 dark:text-nightpaper/85">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10 pb-20">
        <SectionHeading eyebrow="File No. 017 — Stack" title="Tools I reach for" />
        <div className="space-y-5 mb-10">
          {stackGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 dark:text-nightpaper/50 mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <SectionHeading eyebrow="File No. 018 — Fun Facts" title="Off the clock" />
        <ul className="list-disc list-inside space-y-2 text-ink/70 dark:text-nightpaper/70">
          {funFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>
    </>
  )
}
