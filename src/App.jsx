import React from 'react'
import './App.css'
import data from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CursorGlow from './components/CursorGlow'
import { FaProjectDiagram, FaTools, FaEnvelope } from 'react-icons/fa'
import Typewriter from './components/Typewriter'

function App() {
  return (
    <div className="min-h-screen min-w-full bg-white text-gray-900 antialiased flex flex-col">
      {/* Cursor glow placed top-level so position:fixed is relative to viewport */}
      <CursorGlow />
      {/* enable smooth scrolling for anchor links */}
      <div className="scroll-smooth flex-1 hover-glow">
        <Header siteTitle={data.name} nav={data.nav} />

        <main className="max-w-5xl mx-auto px-6 py-12 flex-1">
          <Hero data={data} />
          {/* tech carousel (auto-moving) - use flattened skills list */}
          <Carousel items={[...new Set(data.skills.flatMap(s => s.items))]} />

          <section id="projects" className="mt-20">
            <h2 className="text-2xl font-semibold mb-6 flex flex-col items-center gap-3">
              <span className="gradient-text text-2xl"><FaProjectDiagram /></span>
              <Typewriter text="Projects" className="text-2xl" />
            </h2>
            <Projects projects={data.projects} />
          </section>

          <section id="skills" className="mt-20">
            <h2 className="text-2xl font-semibold mb-6 flex flex-col items-center gap-3">
              <span className="gradient-text text-2xl"><FaTools /></span>
              <Typewriter text="Skills" className="text-2xl" />
            </h2>
            <Skills skills={data.skills} />
          </section>

          <section id="contact" className="mt-20 mb-24">
            <h2 className="text-2xl font-semibold mb-6 flex flex-col items-center gap-3">
              <span className="gradient-text text-2xl"><FaEnvelope /></span>
              <Typewriter text="Contact" className="text-2xl" />
            </h2>
            <Contact contact={data.contact} socials={data.socials} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
