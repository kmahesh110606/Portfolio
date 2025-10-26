import React from 'react'
import { MegaphoneFilled, HeadphonesColor, PeopleCall16Filled } from '@fluentui/react-icons'

export default function Header({ siteTitle = 'Portfolio', nav = [] }) {
  const NAV_ICONS = {
    projects: MegaphoneFilled,
    skills: HeadphonesColor,
    contact: PeopleCall16Filled,
  }
  return (
  <header className="sticky top-0 z-50 header-blur">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 flex items-center justify-center text-white font-semibold">
            {siteTitle.split(' ').map((s) => s[0]).slice(0,2).join('')}
          </div>
          <div className="text-lg font-medium text-gray-800">{siteTitle}</div>
        </a>

        <nav className="hidden md:flex items-center gap-3">
          {nav.map((n) => {
            const Icon = NAV_ICONS[n.id]
            return (
              <a key={n.id} href={`#${n.id}`} className="pill" aria-label={n.label}>
                <span className="icon">
                  {Icon ? <Icon className="w-5 h-5" /> : null}
                </span>
                <span className="label">{n.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="md:hidden">
          <details>
            <summary className="cursor-pointer">Menu</summary>
            <div className="flex flex-col mt-2">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="py-1 text-gray-700">
                  {n.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
