// Fill this file with your personal data. The app consumes this shape.
const data = {
  name: 'Your Name',
  title: 'Computer Science (AIML) Engineering Student',
  tagline: 'I build small ML-powered tools, experiments and web apps.',
  about: `I'm a Computer Science (AIML) engineering student focused on machine learning, data engineering and building reproducible web tools. Replace this paragraph with a short bio describing your interests, current year, and what you're looking for (internships, projects, research).`,

  // navigation entries (anchors on the single page)
  nav: [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],

  // resume link (optional)
  resume: '#',

  // social links
  socials: [
    { name: 'GitHub', href: 'https://github.com/your-username' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/your-profile' },
    { name: 'Email', href: 'mailto:you@example.com' },
  ],

  // skills grouped by category. `icon` is a free-text identifier you can use
  // to swap with Fluent UI icon names later if you want.
  skills: [
    {
      category: 'Core',
      items: ['Python', 'C/C++', 'JavaScript', 'Data Structures', 'Algorithms'],
    },
    {
      category: 'Machine Learning / AI',
      items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Transformers', 'Computer Vision'],
    },
    {
      category: 'Data & DevOps',
      items: ['Pandas', 'SQL', 'Docker', 'AWS', 'ML Pipelines'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Tailwind CSS', 'Vite', 'TypeScript (optional)'],
    },
  ],

  // projects - fill with your projects, links and tech stack
  projects: [
    {
      title: 'Example ML Project',
      description:
        'A short description of the project: problem solved, your role, and the tech used.',
      link: '#',
      tech: ['Python', 'PyTorch', 'Flask'],
    },
    {
      title: 'Portfolio Website (this template)',
      description:
        'Single-page portfolio built with React + Tailwind. Fill data.js to customise.',
      link: '#',
      tech: ['React', 'Tailwind'],
    },
  ],

  contact: {
    email: 'kmahesh110606@outlook.com',
    phone: '8591495253',
    whatsapp: '918591495253',
    note: 'Open to internships and project collaborations. Prefer email for contact.'
  }
}

export default data
