import { Product } from '../types'

export const products: Product[] = [
  {
    slug: 'dsa-revision-lab',
    title: 'The Spaced-Repetition DSA System',
    tagline: 'Stop solving random DSA problems just to forget them.',
    description:
      "A Notion system built around one workflow: solve, log, classify, review, recall, recognize the pattern, retain. Instead of grinding random problems and forgetting them a week later, every problem you solve gets scheduled for review based on how it went — struggled, needed a hint, or solved cleanly — so you actually build pattern recognition instead of just logging hours.",
    price: 'Free',
    category: 'Study Systems',
    format: 'Notion template',
    razorpayUrl: '', // paste your Razorpay Payment Page link here once it is live (leave empty while the product is free)
    images: [ '/products/dsa-revision-lab/dashboard.png',
      '/products/dsa-revision-lab/problem.png',
   '/products/dsa-revision-lab/progress.png' ], // add screenshot paths once ready, e.g. '/products/dsa-revision-lab/dashboard.png'
    featured: true,
    whatsIncluded: [
      'Home Dashboard',
      'DSA Master Problem Tracker — starts with 31 problems, including Union Find',
      'Revision Engine with working spaced-repetition formulas (Next Review, Review Status, Days Until Review)',
      '15-page Pattern Library (Sliding Window, Two Pointers, Binary Search, Hashing, Stack, Trees, Graphs, Arrays, Prefix Sum, Linked List, Heap, Backtracking, Greedy, Intervals, DP, Union Find)',
      'Problem Review Page Template',
      'Progress stats page',
      'START HERE guide',
    ],
    version: '1.0',
    lastUpdated: '2026-09-29',
    faqs: [],
    previewUrl: 'https://chartreuse-astronomy-290.notion.site/DSA-Revision-Lab-3ef1a5d6be4680d5bdf4e500f604b13f',
    templateUrl: 'https://chartreuse-astronomy-290.notion.site/DSA-Revision-Lab-3ef1a5d6be4680d5bdf4e500f604b13f',
  },
  {
    slug: 'freelance-flow',
    title: 'Freelance Flow — The Calm Business System for Freelancers',
    tagline: 'A calm, minimal Notion system for managing leads, clients, projects, and invoices.',
    description:
      "Built for solo freelancers with roughly 2–15 active clients — not agencies, not teams. A Command Center dashboard ties together your leads, clients, projects, tasks, and invoices in one calm, minimal system designed to work entirely on Notion's free plan. No feature bloat, just the parts that actually run a freelance business.",
    price: 'Free',
    category: 'Freelance Tools',
    format: 'Notion template',
    razorpayUrl: '', // paste your Razorpay Payment Page link here once it is live (leave empty while the product is free)
    images: [], // add screenshot paths once ready, e.g. '/products/freelance-flow/dashboard.png'
    featured: true,
    whatsIncluded: [
      'Command Center dashboard',
      'Leads database',
      'Clients database',
      'Projects database',
      'Tasks database',
      'Invoices database',
      'Money page',
      'Client Portal',
      'Start Here guide',
    ],
    version: '0.1',
    lastUpdated: '2026-09-21',
    faqs: [],
    previewUrl: 'https://chartreuse-astronomy-290.notion.site/Freelance-Flow-3ef1a5d6be4680adaa3cd41148525de4',
    templateUrl: 'https://chartreuse-astronomy-290.notion.site/Freelance-Flow-3ef1a5d6be4680adaa3cd41148525de4',
  },
]
