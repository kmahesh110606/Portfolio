import React from 'react'
import { FaFileCode } from 'react-icons/fa'
import {
  SiDjango,
  SiDotnet,
  SiC,
  SiCplusplus,
  SiCsharp,
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiDocker,
  SiAmazonaws,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiTypescript,
  SiJavascript,
  SiGit,
  SiGithub,
  SiMicrosoft
} from 'react-icons/si'

const ICON_MAP = {
  Django: SiDjango,
  '.NET': SiDotnet,
  C: SiC,
  'C++': SiCplusplus,
  'C#': SiCsharp,
  Python: SiPython,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  Docker: SiDocker,
  AWS: SiAmazonaws,
  React: SiReact,
  'Tailwind CSS': SiTailwindcss,
  Vite: SiVite,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Git: SiGit,
  GitHub: SiGithub,
  XAML: SiMicrosoft,
  WPF: SiMicrosoft,
}

function SkillPill({ name }) {
  const Icon = ICON_MAP[name]
  const COLORS = {
    Django: '#092E20',
    '.NET': '#512BD4',
    C: '#239120',
    'C++': '#00599C',
    'C#': '#178600',
    Python: '#3776AB',
    PyTorch: '#EE4C2C',
    TensorFlow: '#FF6F00',
    Docker: '#2496ED',
    AWS: '#FF9900',
    React: '#61DAFB',
    'Tailwind CSS': '#06B6D4',
    Vite: '#646cff',
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Git: '#F05032',
    GitHub: '#181717',
  }
  const color = COLORS[name] || '#8b5cf6'
  return (
    <div className="inline-flex items-center gap-2 mr-3 mb-3 px-3 py-2">
      {Icon ? (
        <Icon className="text-2xl" style={{ color }} />
      ) : (
        <FaFileCode className="text-2xl" style={{ color }} />
      )}
      <span className="text-sm text-gray-800">{name}</span>
    </div>
  )
}

export default function Skills({ skills = [] }) {
  return (
    <div className="space-y-6">
      {skills.map((group) => (
        <div key={group.category}>
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-lg">
            <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg,#ffd54a,#8b5cf6)', color: 'white'}}>{group.category[0]}</span>
            {group.category}
          </h4>
          <div className="flex flex-wrap items-center">
            {group.items.map((s) => (
              <SkillPill key={s} name={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
