import React, { useState, useRef, useEffect } from 'react'
import { MegaphoneFilled, HeadphonesColor, PeopleCall16Filled, Dismiss24Regular } from '@fluentui/react-icons'

export default function Header({ siteTitle = 'Portfolio', nav = [] }) {
  const NAV_ICONS = {
    projects: MegaphoneFilled,
    skills: HeadphonesColor,
    contact: PeopleCall16Filled,
  }

  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onDoc(e) {
      if (!panelRef.current || !btnRef.current) return
      if (panelRef.current.contains(e.target) || btnRef.current.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDoc)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDoc)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 header-blur">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between relative">
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

  {/* Mobile-only menu button */}
  <div className="md:hidden">
          <button
            ref={btnRef}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
            className={open ? 'pill menu-btn' : 'menu-btn icon-only'}
            title="Open menu"
            style={{ border: 'none', background: 'transparent' }}
          >
            <span className="icon">☰</span>
            <span className="label">Menu</span>
          </button>

          {/* absolute dropdown panel */}
          {open && (
              <div
                id="mobile-menu"
                ref={panelRef}
                className="mobile-menu-overlay origin-top-right right-6 top-full mt-3 w-56 rounded-lg shadow-xl backdrop-blur-lg"
                style={{ position: 'absolute', zIndex: 60 }}
              >
                <div className="p-3 flex flex-col gap-2">
                  {nav.map((n) => {
                    const Icon = NAV_ICONS[n.id]
                    return (
                      <a
                        key={n.id}
                        href={`#${n.id}`}
                        className="flex items-center gap-3 px-2 py-2 rounded-md mobile-menu-item"
                        onClick={() => setOpen(false)}
                      >
                        <span className="icon" style={{ color: '#111827' }}>
                          {Icon ? <Icon className="w-5 h-5" /> : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3"/></svg>
                          )}
                        </span>
                        <span className="font-medium">{n.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
          )}
        </div>
      </div>
    </header>
  )
}
