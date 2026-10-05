import { Resource } from '../types'

// Drop each PDF into public/resources/ using the exact filename below and it will
// download from the site automatically. See public/resources/README.txt.
export const resources: Resource[] = [
  {
    slug: 'one-shot-sql-for-interviews',
    title: 'One Shot of SQL for Interviews',
    description: 'The SQL you need for interviews, covered in one sitting.',
    type: 'PDF',
    downloadUrl: '/resources/one-shot-sql-for-interviews.pdf',
  },
  {
    slug: 'basic-python-notes',
    title: 'Basic Python Notes',
    description: 'Clean, beginner-friendly notes covering Python fundamentals.',
    type: 'PDF',
    downloadUrl: '/resources/basic-python-notes.pdf',
  },
  {
    slug: 'oops-explained-simply',
    title: 'OOPs Explained in the Simplest Way',
    description: 'Object-oriented programming concepts explained without the jargon.',
    type: 'PDF',
    downloadUrl: '/resources/oops-explained-simply.pdf',
  },
  {
    slug: 'logic-building-for-dsa',
    title: 'Logic Building for DSA Questions',
    description: 'How to think through DSA problems before you start coding.',
    type: 'PDF',
    downloadUrl: '/resources/logic-building-for-dsa.pdf',
  },
]
