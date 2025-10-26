import React, { useEffect, useState } from 'react'
import Network3D from './Network3DCanvas'
import VaraText from './VaraText'

export default function Hero({ data }) {
  const [animate, setAnimate] = useState(false)
  const [nameSize, setNameSize] = useState(56)

  useEffect(() => {
    function update() {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1024
      if (w < 480) setNameSize(40)
      else if (w < 768) setNameSize(48)
      else setNameSize(56)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    // trigger letter animation on mount (first time)
    setAnimate(true)
    const t = setTimeout(() => setAnimate(false), 3500)
    return () => clearTimeout(t)
  }, [])

  const nameChars = data.name.split('')

  // create a single string element for cursive write animation
  const fullName = data.name

  return (
    <section id="home" className="grid md:grid-cols-2 gap-8 items-center min-h-screen">
      <div className="order-2 md:order-1">
        <h1 className="text-2xl md:text-3xl font-extrabold leading-tight text-center md:text-left">
          {/* Use Vara handwriting animation for the main name. Responsive fontSize to avoid large gaps. */}
          <VaraText text={"K. Mahesh Chandran"} fontSize={nameSize} strokeWidth={Math.max(1.2, nameSize / 30)} />
        </h1>
        <p className="text-purple-700 font-medium mt-2">{data.title}</p>
        <p className="mt-6 text-gray-700 max-w-2xl">{data.about}</p>

        <div className="mt-6 flex gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-purple-500 text-white shadow-lg transform transition hover:-translate-y-1"
          >
            See Projects
          </a>
          <a href="#contact" className="px-4 py-2 rounded-md text-gray-700 border-transparent">
            Contact
          </a>
        </div>
      </div>

      <div className="flex justify-center md:justify-end relative order-1 md:order-2">
        <div className="relative w-64 h-64 md:w-[480px] md:h-[480px] flex items-center justify-center overflow-visible">
          {/* Network behind profile */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Network3D size={420} />
          </div>

          {/* Big round profile circle (profile sits beneath nodes to allow nodes to float over it) */}
          <div className="hero-profile w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl">
            {/* placeholder initials; replace with <img src="..." /> if you have a profile picture */}
            {data.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
          </div>
        </div>
      </div>
    </section>
  )
}
