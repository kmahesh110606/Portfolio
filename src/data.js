// Fill this file with your personal data. The app consumes this shape.
const data = {
  name: 'kmahesh110606.com',
  title: 'Computer Science (AIML) Engineering Student',
  tagline: 'Love Tech!!.',
  about: `I'm a Computer Science (AIML) engineering student focused on machine learning, data engineering and building reproducible web tools.`,

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
    { name: 'GitHub', href: 'https://github.com/kmahesh110606' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/kmahesh110606' },
    { name: 'Instagram', href: 'https://instagram.com/kmahesh110606' },
  ],

  // skills grouped by category. `icon` is a free-text identifier you can use
  // to swap with Fluent UI icon names later if you want.
  skills: [
    {
      category: 'Core',
      items: ['Python', 'C/C++', 'JavaScript', 'Data Structures', 'Algorithms'],
    },
    {
      category: 'Cloud',
      items: ['GitHub Pages', 'Netlify', 'Render', 'Microsoft Azure'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Tailwind CSS', 'Vite', ''],
    },
  ],

  // projects - fill with your projects, links and tech stack
  projects: [
    {
      title: 'VHome',
      description:
        'A one stop gateway to all services and websites used by students of VIT Chennai',
      link: 'https://vhome.co.in',
      tech: ['React', 'Vite', 'TailWindCSS', 'HTML', 'CSS', 'JavaScript', 'FluentUI Icons Library',],
    },
    {
      title: 'WorkSpace OS',
      description:
        'A Cloud-Based OS that stays in the Web, accessible from wherever you are!!',
      link: '#',
      tech: ['Django', 'Python', 'Python-Models', 'JavaScript', 'HTML', 'CSS', 'Microsoft Azure (Hosting)'],
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
