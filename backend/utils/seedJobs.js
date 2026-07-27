import Job from '../models/Job.js';

const SAMPLE_JOBS = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'Bangalore, Karnataka',
    salary: '₹18L - ₹24L',
    type: 'full-time',
    description:
      'Build cutting-edge React applications and contribute to our design system. Lead frontend architecture decisions and mentor junior developers.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'UI/UX design skills'],
    benefits: ['Health insurance', 'PF & gratuity', 'Remote work options'],
    remote: true,
  },
  {
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Mumbai, Maharashtra',
    salary: '₹15L - ₹22L',
    type: 'full-time',
    description:
      'Shape the future of our platform. Work closely with engineering and design teams to deliver amazing user experiences.',
    requirements: ['3+ years product management', 'Agile methodology', 'Data-driven mindset'],
    benefits: ['ESOP package', 'Health insurance', 'Flexible PTO'],
    remote: false,
  },
  {
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Hyderabad, Telangana',
    salary: '₹10L - ₹14L',
    type: 'full-time',
    description:
      'Create intuitive and beautiful user experiences. Collaborate with cross-functional teams to solve complex design challenges.',
    requirements: ['Portfolio of UX projects', 'Figma expertise', 'User research experience'],
    benefits: ['Creative freedom', 'Conference budget', 'Unlimited PTO'],
    remote: true,
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Pune, Maharashtra',
    salary: '₹14L - ₹20L',
    type: 'full-time',
    description:
      'Build and maintain scalable cloud infrastructure using Kubernetes, Docker, and AWS. Automate deployments and ensure high availability.',
    requirements: ['3+ years DevOps experience', 'Kubernetes expertise', 'AWS/Azure knowledge'],
    benefits: ['Competitive salary', 'Health insurance', 'Remote work options'],
    remote: true,
  },
  {
    title: 'Data Scientist',
    company: 'Analytics Corp',
    location: 'Chennai, Tamil Nadu',
    salary: '₹12L - ₹18L',
    type: 'full-time',
    description:
      'Turn data into actionable insights. Build predictive models, work with large datasets, and present findings to stakeholders.',
    requirements: ['MS/PhD in Statistics/CS', 'Python/R proficiency', 'Machine learning experience'],
    benefits: ['Health insurance', 'Conference attendance', 'Research budget'],
    remote: false,
  },
  {
    title: 'Mobile Developer (React Native)',
    company: 'AppWorks',
    location: 'Gurgaon, Haryana',
    salary: '₹10L - ₹15L',
    type: 'contract',
    description:
      'Build cross-platform mobile applications with React Native. Implement features and optimize app performance.',
    requirements: ['2+ years React Native', 'JavaScript/TypeScript', 'API integration experience'],
    benefits: ['Competitive contract rate', 'Flexible schedule', 'Remote work options'],
    remote: true,
  },
  {
    title: 'Backend Engineer (Node.js)',
    company: 'FinServe Technologies',
    location: 'Bangalore, Karnataka',
    salary: '₹16L - ₹22L',
    type: 'full-time',
    description:
      'Design and build robust APIs and microservices for our fintech platform. Work with MongoDB, Redis, and event-driven architecture.',
    requirements: ['4+ years Node.js experience', 'REST & GraphQL APIs', 'Database design skills'],
    benefits: ['Performance bonus', 'Health insurance', 'Learning stipend'],
    remote: true,
  },
  {
    title: 'QA Automation Engineer',
    company: 'QualityFirst Labs',
    location: 'Noida, Uttar Pradesh',
    salary: '₹8L - ₹12L',
    type: 'full-time',
    description:
      'Develop automated test suites for web and mobile products. Partner with engineering to improve release quality and CI pipelines.',
    requirements: ['Selenium/Cypress experience', 'API testing', 'CI/CD familiarity'],
    benefits: ['Health insurance', 'Certification support', 'Hybrid work'],
    remote: false,
  },
  {
    title: 'Marketing Intern',
    company: 'GrowthHive',
    location: 'Delhi, NCR',
    salary: '₹25k - ₹35k/month',
    type: 'internship',
    description:
      'Support digital marketing campaigns, content creation, and social media strategy for a fast-growing startup.',
    requirements: ['Strong written English', 'Social media savvy', 'Basic analytics knowledge'],
    benefits: ['Mentorship', 'Certificate on completion', 'Conversion to full-time opportunity'],
    remote: false,
  },
  {
    title: 'Technical Writer',
    company: 'DocuTech',
    location: 'Remote, India',
    salary: '₹7L - ₹10L',
    type: 'part-time',
    description:
      'Create clear developer documentation, API guides, and release notes for our SaaS products.',
    requirements: ['Technical writing portfolio', 'Markdown proficiency', 'API documentation experience'],
    benefits: ['Flexible hours', 'Remote-first', 'Professional development budget'],
    remote: true,
  },
];

export const seedJobs = async () => {
  let inserted = 0;
  let updated = 0;

  for (const job of SAMPLE_JOBS) {
    const existing = await Job.findOne({ title: job.title, company: job.company });
    if (existing) {
      await Job.updateOne({ _id: existing._id }, job);
      updated += 1;
    } else {
      await Job.create(job);
      inserted += 1;
    }
  }

  console.log(`✅ Jobs seed complete: ${inserted} added, ${updated} updated (${SAMPLE_JOBS.length} total sample jobs)`);
};
