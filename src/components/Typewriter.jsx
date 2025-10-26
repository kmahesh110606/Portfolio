import React, { useEffect, useState } from 'react'

export default function Typewriter({ text = '', speed = 40, className = '' }) {
  const [visible, setVisible] = useState('')
  const ref = React.useRef(null)

  useEffect(() => {
    let obs
    let id
    function start() {
      let i = 0
      setVisible('')
      id = setInterval(() => {
        i++
        setVisible(text.slice(0, i))
        if (i >= text.length) clearInterval(id)
      }, speed)
    }

    if (typeof IntersectionObserver !== 'undefined' && ref.current) {
      obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start()
            obs.disconnect()
          }
        })
      }, { threshold: 0.3 })
      obs.observe(ref.current)
    } else {
      // fallback: start immediately
      start()
    }

    return () => {
      if (obs) obs.disconnect()
      if (id) clearInterval(id)
    }
  }, [text, speed])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {visible}
      <span className="inline-block w-1 h-5 align-middle ml-1 bg-gray-800 animate-pulse" aria-hidden="true" />
    </span>
  )
}
