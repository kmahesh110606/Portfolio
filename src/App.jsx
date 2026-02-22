import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaGlobe, FaDatabase, FaFileWord, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa'
import {
  SiAdobexd,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAssemblyscript,
  SiBootstrap,
  SiC,
  SiCanva,
  SiCplusplus,
  SiCsharp,
  SiCss3,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiNotion,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVisualstudio,
  SiVisualstudiocode,
  SiWindows11,
} from 'react-icons/si'
import './App.css'
import data from './data'

const SOCIAL_ICON_MAP = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
}

const SKILL_ICON_MAP = {
  c: SiC,
  'c++': SiCplusplus,
  'c#': SiCsharp,
  java: SiOpenjdk,
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  sqlite3: FaDatabase,
  sql: SiMysql,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  xaml: SiWindows11,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss3,
  'x86 assembly': SiAssemblyscript,

  '.net': SiDotnet,
  flask: SiFlask,
  django: SiDjango,
  fastapi: SiFastapi,
  react: SiReact,
  'react.js': SiReact,
  vite: SiVite,
  'tailwind css': SiTailwindcss,
  tailwindcss: SiTailwindcss,
  bootstrap: SiBootstrap,
  winui3: SiWindows11,
  winforms: SiDotnet,
  uwp: SiWindows11,
  redis: SiRedis,
  websockets: SiSocketdotio,

  canva: SiCanva,
  'adobe photoshop': SiAdobephotoshop,
  'dall·e': SiOpenai,
  'dall-e': SiOpenai,
  'adobe illustrator': SiAdobeillustrator,
  figma: SiFigma,
  'adobe xd': SiAdobexd,

  'microsoft word': FaFileWord,
  'microsoft excel': FaFileExcel,
  'microsoft access': FaDatabase,
  'microsoft powerpoint': FaFilePowerpoint,
  windows: SiWindows11,
  linux: SiLinux,
  'visual studio': SiVisualstudio,
  'visual studio code': SiVisualstudiocode,
  postman: SiPostman,
  'google docs': FaGlobe,
  'google slides': FaGlobe,
  git: SiGit,
  github: FaGithub,
  docker: SiDocker,
  notion: SiNotion,
}

const SKILL_ICON_COLOR_MAP = {
  c: '#A8B9CC',
  'c++': '#00599C',
  'c#': '#68217A',
  java: '#f89820',
  python: '#3776AB',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  sqlite3: '#003B57',
  sql: '#4479A1',
  postgresql: '#336791',
  mysql: '#4479A1',
  xaml: '#0078D4',
  html: '#E34F26',
  html5: '#E34F26',
  css: '#1572B6',
  'x86 assembly': '#A3A3A3',

  '.net': '#512BD4',
  flask: '#FFFFFF',
  django: '#092E20',
  fastapi: '#009688',
  react: '#61DAFB',
  'react.js': '#61DAFB',
  vite: '#646CFF',
  'tailwind css': '#06B6D4',
  tailwindcss: '#06B6D4',
  bootstrap: '#7952B3',
  winui3: '#0078D4',
  winforms: '#512BD4',
  uwp: '#0078D4',
  redis: '#DC382D',
  websockets: '#25c2a0',

  canva: '#00C4CC',
  'adobe photoshop': '#31A8FF',
  'dall·e': '#10A37F',
  'dall-e': '#10A37F',
  'adobe illustrator': '#FF9A00',
  figma: '#F24E1E',
  'adobe xd': '#FF61F6',

  'microsoft word': '#185ABD',
  'microsoft excel': '#217346',
  'microsoft access': '#A4373A',
  'microsoft powerpoint': '#B7472A',
  windows: '#0078D4',
  linux: '#FCC624',
  'visual studio': '#5C2D91',
  'visual studio code': '#007ACC',
  postman: '#FF6C37',
  git: '#F05032',
  github: '#FFFFFF',
  docker: '#2496ED',
  notion: '#FFFFFF',
}

function normalizeSkillName(skill = '') {
  return skill.toLowerCase().replace(/\s+/g, ' ').trim()
}

function getSkillIcon(skill = '') {
  const normalizedName = normalizeSkillName(skill)
  return SKILL_ICON_MAP[normalizedName] || FaGlobe
}

function getSkillIconColor(skill = '') {
  const normalizedName = normalizeSkillName(skill)
  return SKILL_ICON_COLOR_MAP[normalizedName] || '#fff3dd'
}

function ClickBurst() {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    function handleClick(event) {
      const id = Math.random().toString(36).slice(2)
      const newBurst = { id, x: event.clientX, y: event.clientY }
      setBursts((prev) => [...prev, newBurst])
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((item) => item.id !== id))
      }, 680)
    }

    window.addEventListener('pointerdown', handleClick)
    return () => window.removeEventListener('pointerdown', handleClick)
  }, [])

  return (
    <div aria-hidden="true" className="burst-layer">
      {bursts.map((item) => (
        <span
          key={item.id}
          className="click-burst"
          style={{ left: `${item.x}px`, top: `${item.y}px` }}
        />
      ))}
    </div>
  )
}

function Typewriter({ text, speed = 80 }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (displayedText.length === text.length) {
      setIsComplete(true)
    }
  }, [displayedText, text, speed])

  return (
    <span className={`typewriter ${isComplete ? 'complete' : ''}`}>
      {displayedText}
      {!isComplete && <span className="cursor">|</span>}
    </span>
  )
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function useEducationStaggerReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.education-item')
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.24, rootMargin: '0px 0px -8% 0px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')

  useEffect(() => {
    if (!sectionIds.length) return

    function updateActive() {
      let closestId = sectionIds[0]
      let closestDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top - 140)

        if (distance < closestDistance) {
          closestDistance = distance
          closestId = id
        }
      })

      setActiveSection((current) => (current === closestId ? current : closestId))
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [sectionIds])

  return activeSection
}

function useMagneticButtons() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.magnetic-btn'))
    if (!elements.length) return

    const handlers = elements.map((element) => {
      function onMove(event) {
        const rect = element.getBoundingClientRect()
        const offsetX = (event.clientX - (rect.left + rect.width / 2)) / rect.width
        const offsetY = (event.clientY - (rect.top + rect.height / 2)) / rect.height
        element.style.transform = `translate(${offsetX * 14}px, ${offsetY * 14}px) scale(1.04)`
      }

      function onLeave() {
        element.style.transform = 'translate(0px, 0px) scale(1)'
      }

      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerleave', onLeave)

      return { element, onMove, onLeave }
    })

    return () => {
      handlers.forEach(({ element, onMove, onLeave }) => {
        element.removeEventListener('pointermove', onMove)
        element.removeEventListener('pointerleave', onLeave)
      })
    }
  }, [])
}

function CustomCursor() {
  const cursorRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    let nextX = -999
    let nextY = -999

    function paint() {
      frameRef.current = 0
      if (!cursorRef.current) return
      cursorRef.current.style.left = `${nextX}px`
      cursorRef.current.style.top = `${nextY}px`
    }

    function onPointerMove(event) {
      nextX = event.clientX
      nextY = event.clientY
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(paint)
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor-glow" />
}

function MotionSystem() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateFromScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      const nextProgress = Math.min(1, Math.max(0, ratio))
      setProgress((current) => (Math.abs(current - nextProgress) < 0.001 ? current : nextProgress))
      document.documentElement.style.setProperty('--scroll-progress', `${nextProgress}`)
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    }

    function onPointerMove(event) {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      document.documentElement.style.setProperty('--mx', `${nx}`)
      document.documentElement.style.setProperty('--my', `${ny}`)
    }

    updateFromScroll()
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <div className="scroll-meter" style={{ transform: `scaleX(${progress})` }} />
    </>
  )
}

function ProjectsStack({ projects = [] }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const userInteractingRef = useRef(false)
  const interactionTimeoutRef = useRef(null)

  function scrollToIndex(index) {
    const track = trackRef.current
    if (!track || !projects.length) return

    const safeIndex = Math.max(0, Math.min(index, projects.length - 1))
    const card = track.querySelector(`[data-index="${safeIndex}"]`)
    if (!card) return

    // Scroll carousel WITHOUT affecting page scroll
    const cardCenter = card.offsetLeft + card.clientWidth / 2
    const viewCenter = track.clientWidth / 2
    const targetScroll = cardCenter - viewCenter
    
    track.scrollLeft = targetScroll
    setActiveIndex(safeIndex)
  }

  function next() {
    userInteractingRef.current = true
    clearTimeout(interactionTimeoutRef.current)
    scrollToIndex((activeIndex + 1) % projects.length)
    interactionTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false
    }, 2500)
  }

  function prev() {
    userInteractingRef.current = true
    clearTimeout(interactionTimeoutRef.current)
    scrollToIndex((activeIndex - 1 + projects.length) % projects.length)
    interactionTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false
    }, 2500)
  }

  function onTrackScroll() {
    const track = trackRef.current
    if (!track) return

    userInteractingRef.current = true
    clearTimeout(interactionTimeoutRef.current)
    interactionTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false
    }, 3000)

    const cards = Array.from(track.querySelectorAll('.stack-card'))
    if (!cards.length) return

    const center = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const distance = Math.abs(cardCenter - center)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearest = index
      }
    })

    setActiveIndex(nearest)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const handler = () => onTrackScroll()
    track.addEventListener('scroll', handler, { passive: true })
    return () => track.removeEventListener('scroll', handler)
  }, [projects.length])

  // Auto-scroll carousel every 6 seconds - ONLY when user is not interacting
  useEffect(() => {
    if (!projects.length) return
    
    const interval = setInterval(() => {
      if (userInteractingRef.current) return
      
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % projects.length
        const track = trackRef.current
        if (!track) return nextIndex
        
        const card = track.querySelector(`[data-index="${nextIndex}"]`)
        if (card) {
          // Scroll carousel WITHOUT affecting page scroll
          const cardCenter = card.offsetLeft + card.clientWidth / 2
          const viewCenter = track.clientWidth / 2
          const targetScroll = cardCenter - viewCenter
          
          track.scrollLeft = targetScroll
        }
        return nextIndex
      })
    }, 6000)
    
    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <div className="project-stack-wrap">
      <div className="carousel-head">
        <p className="timeline-note">Carousel</p>
        <div className="carousel-controls">
          <button type="button" className="carousel-btn" onClick={prev} aria-label="Previous project">◀</button>
          <button type="button" className="carousel-btn" onClick={next} aria-label="Next project">▶</button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="project-stack"
      >
        {projects.map((project, index) => (
          <article
            key={`${project.title}-${index}`}
            data-index={index}
            className={`project-card stack-card ${activeIndex === index ? 'active-card' : ''}`}
          >
            <div className="project-image-shell">
              {project.image ? (
                <img src={project.image} alt={project.title} className="project-image" />
              ) : (
                <div className="project-image-placeholder">
                  Add image in /src/assets and set `image` in data
                </div>
              )}
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="chip-wrap">
              {project.tech?.map((tech) => (
                <span key={`${project.title}-${tech}`} className="chip">{tech}</span>
              ))}
            </div>
            {project.link && project.link !== '#' ? (
              <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                Open Project
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}

function EducationTimeline({ entries = [] }) {
  return (
    <div className="education-vertical-wrap">
      <p className="timeline-note">Scroll through the timeline</p>
      <div className="education-vertical">
        <div className="timeline-track-vertical" aria-hidden="true" />
        {entries.map((entry, index) => (
          <article
            key={`${entry.institution}-${entry.duration}`}
            className="education-item timeline-item vertical-item"
            style={{ '--edu-delay': `${index * 130}ms` }}
          >
            <span className="timeline-dot vertical-dot" aria-hidden="true" />
            <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{entry.institution}</h3>
            <p className="meta-line">{entry.degree}</p>
            <p className="meta-line">{entry.duration}</p>
            {entry.grade ? <p className="meta-line">Grade: {entry.grade}</p> : null}
            {entry.activities ? <p className="meta-line">Activities: {entry.activities}</p> : null}
          </article>
        ))}
      </div>
    </div>
  )
}

function App() {
  useReveal()
  useEducationStaggerReveal()
  useMagneticButtons()

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const skillGroups = useMemo(() => data.skills || [], [])
  const navIds = useMemo(() => data.nav.map((item) => item.id), [])
  const activeSection = useActiveSection(navIds)

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) {
        setIsMobileNavOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="portfolio-shell">
      <ClickBurst />
      <MotionSystem />

      <header className="site-header">
        <div className="site-header-top">
          <a className="brand" href="#home">kmahesh110606</a>
          <div className="header-actions">
            <button
              type="button"
              className={`nav-toggle ${isMobileNavOpen ? 'open' : ''}`}
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileNavOpen}
              aria-controls="primary-nav"
            >
              {isMobileNavOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        <nav id="primary-nav" className={`site-nav ${isMobileNavOpen ? 'open' : ''}`}>
          {data.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setIsMobileNavOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="hero" data-reveal>
          <h1 className="hero-title"><Typewriter text={data.name} speed={60} /></h1>
          <p className="hero-about">{data.about}</p>
          <div className="hero-actions">
            <a href="#projects" className="cta cta-primary magnetic-btn">Launch Projects</a>
            <a href="#contact" className="cta cta-ghost magnetic-btn">Let&apos;s Talk</a>
          </div>
          <div className="social-row">
            {data.socials.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
                {social.name}
              </a>
            ))}
          </div>
        </section>

        <section id="projects" className="section" data-reveal>
          <h2 className="section-title">Projects</h2>
          <ProjectsStack projects={data.projects} />
        </section>

        <section id="skills" className="section" data-reveal>
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.category} className="skills-panel">
                <h3 className="skills-category">{group.category}</h3>
                <div className="skill-cloud">
                  {group.items?.map((skill) => {
                    const SkillIcon = getSkillIcon(skill)
                    const iconColor = getSkillIconColor(skill)
                    return (
                      <span key={`${group.category}-${skill}`} className="skill-chip">
                        <span className="skill-icon" aria-hidden="true">
                          <SkillIcon style={{ color: iconColor }} />
                        </span>
                        <span>{skill}</span>
                      </span>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section" data-reveal>
          <h2 className="section-title">Licenses & Certifications</h2>
          <div className="project-grid">
            {data.certifications?.map((certification) => (
              <article key={certification.title} className="project-card cert-card">
                <h3>{certification.title}</h3>
                <p>
                  <strong>{certification.issuer}</strong>
                  {certification.issued ? ` • ${certification.issued}` : ''}
                </p>
                {certification.credentialId ? (
                  <p className="meta-line">Credential ID: {certification.credentialId}</p>
                ) : null}
                {certification.document ? (
                  <p className="meta-line">Document: {certification.document}</p>
                ) : null}
                <div className="chip-wrap">
                  {certification.skills?.map((skill) => (
                    <span key={`${certification.title}-${skill}`} className="chip">{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section" data-reveal>
          <h2 className="section-title">Education</h2>
          <EducationTimeline entries={data.education || []} />
        </section>

        <section id="contact" className="section" data-reveal>
          <h2 className="section-title">Contact</h2>
          <div className="contact-glass-wrap">
            <div className="contact-panel contact-main-panel">
              <p className="contact-kicker">LET&apos;S BUILD SOMETHING WILD</p>
              <h3 className="contact-title">Open for internships, collaborations, and product ideas.</h3>
              <p className="meta-line">{data.contact.note}</p>

              <div className="contact-action-row">
                <a className="contact-pill" href={`mailto:${data.contact.email}`}>Email Me</a>
                <a className="contact-pill" href={`tel:${data.contact.phone}`}>Call Me</a>
                <a className="contact-pill" href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="contact-panel contact-side-panel">
              <p className="contact-mini-title">Follow on</p>
              <div className="contact-social-grid credit-social-grid">
                {data.socials.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.name.toLowerCase()] || FaGlobe
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-cred-row"
                    >
                      <span className="social-cred-icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <span className="social-cred-name">{social.name}</span>
                      <span className="social-cred-arrow" aria-hidden="true">↗</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>All rights reserved, K Mahesh Chandran</p>
        <p>400703 - IN</p>
      </footer>
    </div>
  )
}

export default App
