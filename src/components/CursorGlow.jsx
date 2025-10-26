import React, { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let lastX = 0, lastY = 0
    function onMove(e) {
      // smooth follow using lerp for subtle trailing effect
      const x = e.clientX
      const y = e.clientY
      lastX += (x - lastX) * 0.24
      lastY += (y - lastY) * 0.24
      el.style.left = lastX + 'px'
      el.style.top = lastY + 'px'
      el.style.opacity = '0.95'
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
