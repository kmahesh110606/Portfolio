import React, { useEffect, useRef, useState } from 'react'
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGraphql,
  SiNextdotjs,
  SiVite,
  SiPython,
  SiGithub,
} from 'react-icons/si'

// Canvas-only deterministic network renderer. Draws lines and circular nodes
// on a single canvas so layout stays stable and the whole graph can live
// behind the profile picture without DOM jitter.

const NODE_LABELS = [
  'React', 'Node', 'Mongo', 'TS', 'JS', 'Tailwind', 'GraphQL', 'Next', 'Vite', 'Py', 'GH'
]

  const ICONS = [SiReact, SiNodedotjs, SiMongodb, SiTypescript, SiJavascript, SiTailwindcss, SiGraphql, SiNextdotjs, SiVite, SiPython, SiGithub]
  const COLORS = ['#61DAFB','#68A063','#4DB33D','#3178C6','#F7DF1E','#06B6D4','#E10098','#000000','#646cff','#3776AB','#111827']

export default function Network3DCanvas({ size = 720 }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [positions, setPositions] = useState([]) // relative positions from center in px

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')

    // deterministic base positions — intentionally non-uniform to avoid a perfect ring.
    // Uses trig-based offsets (no randomness) so layout is deterministic on every load.
    const BASE_POS = NODE_LABELS.map((_, i) => {
      const n = NODE_LABELS.length
      // base angle spread, then add a modest index-based wiggle to break uniformity
      const angle = (i / n) * Math.PI * 2 + Math.sin(i * 1.7) * 0.28
      // vary radius by index groups so nodes cluster rather than form a single ring
      const band = (i % 3) / 3
      const r = size * (0.18 + band * 0.18 + Math.cos(i * 1.3) * 0.06)
      return { x: Math.cos(angle) * r, y: Math.sin(angle) * r }
    })

    function draw() {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const w = rect.width
      const h = rect.height
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      // scale factor so BASE_POS (which was built for `size`) fits current rect
      const scale = Math.min(w, h) / size

  // precompute node screen positions (absolute) and also store relative positions
  const pts = BASE_POS.map(p => ({ x: cx + p.x * scale, y: cy + p.y * scale }))
  const rel = BASE_POS.map(p => ({ x: p.x * scale, y: p.y * scale }))
  // publish relative positions for DOM node overlay
  setPositions(rel)

      // draw connecting lines — make them more visible and fade with distance
      const baseLineWidth = Math.max(1.2, Math.min(2.2, Math.min(w, h) / 540))
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const fade = Math.max(0.06, 0.42 - dist / (size * scale * 0.9))
          ctx.beginPath()
          ctx.lineWidth = baseLineWidth * (0.75 + (fade * 0.9))
          ctx.strokeStyle = `rgba(110,70,200,${Math.min(0.9, fade).toFixed(3)})`
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // draw nodes (filled circles with soft gradient) — no text labels
      pts.forEach((p, i) => {
        const r = Math.max(10, Math.min(20, (Math.min(w, h) / 900) * 18))
        const baseColor = COLORS[i % COLORS.length] || '#8b5cf6'
        const g = ctx.createRadialGradient(p.x - r * 0.25, p.y - r * 0.25, 2, p.x, p.y, r * 1.2)
        g.addColorStop(0, hexToRgba(baseColor, 0.98))
        g.addColorStop(1, hexToRgba(baseColor, 0.22))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()

        ctx.lineWidth = 1
        ctx.strokeStyle = hexToRgba(baseColor, 0.18)
        ctx.beginPath()
        ctx.arc(p.x, p.y, r + 1, 0, Math.PI * 2)
        ctx.stroke()
      })
    }

    // helper: convert #rrggbb to rgba(r,g,b,a)
    function hexToRgba(hex, a = 1) {
      if (!hex) return `rgba(139,92,246,${a})`
      const h = hex.replace('#', '')
      const r = parseInt(h.substring(0, 2), 16)
      const g = parseInt(h.substring(2, 4), 16)
      const b = parseInt(h.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }

  draw()

    const onResize = () => draw()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [size])

    return (
      <div
        ref={containerRef}
        className="network-3d absolute inset-0 flex items-center justify-center"
        style={{ width: size, height: size }}
        aria-hidden={false}
      >
        <canvas
          ref={canvasRef}
          className="network-canvas"
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', boxShadow: 'none', borderRadius: 0 }}
        />
        {/* Overlay DOM icons positioned to match canvas nodes. Kept static (no hover transforms) to avoid layout jitter. */}
        {positions.map((p, i) => {
          const Icon = ICONS[i % ICONS.length]
          const nodeSize = 28
          const color = COLORS[i % COLORS.length]
          return (
            <div
              key={i}
              className="network-icon"
              style={{
                position: 'absolute',
                left: `calc(50% + ${Math.round(p.x)}px)`,
                top: `calc(50% + ${Math.round(p.y)}px)`,
                transform: 'translate(-50%, -50%)',
                width: nodeSize,
                height: nodeSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.06)',
                boxShadow: '0 6px 18px rgba(11,10,17,0.04)',
                pointerEvents: 'none',
              }}
            >
              <Icon style={{ width: Math.round(nodeSize * 0.8), height: Math.round(nodeSize * 0.8), color }} />
            </div>
          )
        })}
      </div>
    )
}
