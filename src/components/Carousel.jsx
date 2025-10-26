import React from 'react'
import { SiPython, SiPytorch, SiTensorflow, SiDocker, SiReact, SiTailwindcss, SiC, SiCplusplus, SiCsharp, SiGithub, SiVite } from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'

const ICON_COLORS = {
  Python: '#3776AB',
  PyTorch: '#EE4C2C',
  TensorFlow: '#FF6F00',
  Docker: '#2496ED',
  React: '#61DAFB',
  'Tailwind CSS': '#06B6D4',
  C: '#239120',
  'C++': '#00599C',
  'C#': '#178600',
  GitHub: '#181717',
  Vite: '#646cff',
  SQL: '#003B57',
}

// simple mapping for some skills to colorful icons (fallback to text)
const ICONS = {
  Python: SiPython,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  Docker: SiDocker,
  React: SiReact,
  'Tailwind CSS': SiTailwindcss,
  C: SiC,
  'C++': SiCplusplus,
  'C#': SiCsharp,
  GitHub: SiGithub,
  Vite: SiVite,
  SQL: FaDatabase,
}

function TechChip({ name }) {
  const Icon = ICONS[name]
  const color = ICON_COLORS[name] || '#8b5cf6'
  return (
    <div className="flex items-center justify-center rounded-md bg-white/90 shadow-sm" style={{ width: 84, height: 84, minWidth: 84 }}>
      {Icon ? <Icon className="w-8 h-8" style={{ color }} /> : <div className="text-sm" style={{ color }}>{name[0]}</div>}
    </div>
  )
}

export default function Carousel({ items = [] }) {
  // duplicate items to create seamless loop
  const list = [...items, ...items]
  return (
    <div className="tech-carousel py-2">
      <div className="tech-track" style={{ animationDuration: '10s' }}>
        {list.map((it, idx) => (
          <div key={idx} className="flex-shrink-0">
            <TechChip name={it} />
          </div>
        ))}
      </div>
    </div>
  )
}
