import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa'
import './App.css'
import data from './data'

const SOCIAL_ICON_MAP = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
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

function getSkillIconVariant(skill = '') {
  const variants = ['variant-1', 'variant-2', 'variant-3', 'variant-4', 'variant-5']
  let hash = 0
  for (let index = 0; index < skill.length; index += 1) {
    hash = (hash << 5) - hash + skill.charCodeAt(index)
    hash |= 0
  }
  return variants[Math.abs(hash) % variants.length]
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

      setActiveSection(closestId)
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
  const [position, setPosition] = useState({ x: -999, y: -999 })

  useEffect(() => {
    function onPointerMove(event) {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <div
      className="custom-cursor-glow"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}

function MotionSystem() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateFromScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      const nextProgress = Math.min(1, Math.max(0, ratio))
      setProgress(nextProgress)
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
          <p className="hero-kicker">SURREAL INTERFACE // 2026</p>
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
                  {group.items?.map((skill) => (
                    <span key={`${group.category}-${skill}`} className="skill-chip">
                      <span className={`skill-icon ${getSkillIconVariant(skill)}`} aria-hidden="true" />
                      <span>{skill}</span>
                    </span>
                  ))}
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
        <p>{data.contact.address || data.contact.location || 'Address: Add your address in data.js'}</p>
      </footer>
    </div>
  )
}

export default App
