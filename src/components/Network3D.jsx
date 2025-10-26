import React, { useEffect, useRef } from 'react'

// Canvas-only deterministic network renderer. Draws lines and circular nodes
// on a single canvas so layout stays stable and the whole graph can live
// behind the profile picture without DOM jitter.

const NODE_LABELS = [
  'React', 'Node', 'Mongo', 'TS', 'JS', 'Tailwind', 'GraphQL', 'Next', 'Vite', 'Py', 'GH'
]

export default function Network3D({ size = 720 }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')

    // deterministic base positions roughly on a ring, tuned for the 'size' prop
    const BASE_POS = NODE_LABELS.map((_, i) => {
      const angle = (i / NODE_LABELS.length) * Math.PI * 2
      const r = size * (0.32 + Math.sin(i * 1.2) * 0.05)
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

      // precompute node screen positions
      const pts = BASE_POS.map(p => ({ x: cx + p.x * scale, y: cy + p.y * scale }))

      // draw subtle connecting lines
      ctx.lineWidth = Math.max(1, Math.min(1.5, Math.min(w, h) / 800))
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const alpha = Math.max(0.04, 0.22 - dist / (size * scale * 1.1))
          ctx.beginPath()
          ctx.strokeStyle = `rgba(120,90,200,${alpha.toFixed(3)})`
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // draw nodes (filled circles with soft gradient and a short label)
      pts.forEach((p, i) => {
        const r = Math.max(10, Math.min(20, (Math.min(w, h) / 900) * 18))
        const g = ctx.createRadialGradient(p.x - r * 0.25, p.y - r * 0.25, 2, p.x, p.y, r * 1.2)
        g.addColorStop(0, 'rgba(255,215,130,0.95)')
        g.addColorStop(1, 'rgba(130,90,200,0.28)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()

        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(255, 240, 200, 0.18)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, r + 1, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = 'rgba(18,18,18,0.9)'
        ctx.font = `${Math.max(9, Math.floor(r * 0.6))}px Inter, ui-sans-serif, system-ui`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const label = NODE_LABELS[i].length > 3 ? NODE_LABELS[i].slice(0, 3) : NODE_LABELS[i]
        ctx.fillText(label, p.x, p.y + 1)
      })
    }

    draw()

    const onResize = () => draw()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [size])

  return (
    <div
      ref={containerRef}
      className="network-3d absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="network-canvas rounded-full shadow-xl" />
    </div>
  )
}
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // compute positions from dataset coords (container-local center)
  // compute center from the actual canvas size so coordinates align with rendered canvas
  const center = { x: w / 2, y: h / 2 }
      const points = nodeRefs.current.map((el) => {
        if (!el) return null
        const x = parseFloat(el.dataset.x || 0)
        const y = parseFloat(el.dataset.y || 0)
        return { x: center.x + x, y: center.y + y }
      }).filter(Boolean)

      // draw soft purple lines
      ctx.strokeStyle = 'rgba(139,92,246,0.36)'
      ctx.lineWidth = 0.9
      ctx.lineCap = 'round'
      const threshold = Math.max(size / 3, 160)
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i]
          const b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < threshold) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // debug overlay: circles + indices when data-debug="1"
      try {
        const debug = container.dataset && container.dataset.debug === '1'
        if (debug) {
          ctx.fillStyle = '#ffd54a'
          ctx.font = '10px sans-serif'
          ctx.fillText('dbg', 10, 10)
          points.forEach((p, idx) => {
            ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill()
            ctx.fillStyle = '#8b5cf6'; ctx.fillText(String(idx), p.x + 6, p.y + 4); ctx.fillStyle = '#ffd54a'
          })
        }
      } catch (e) {}
    }

  // initial draw after layout
  setTimeout(() => updateLinesToCanvas(), 120)

    // Make network static: remove drag handlers and per-frame rotation to avoid flicker.
    try { container.style.cursor = 'default' } catch (e) {}

    // ensure nodes are positioned as initialized (prevent CSS animation from nudging layout)
    try {
      nodeRefs.current.forEach((el) => {
        if (!el) return
        const dx = parseFloat(el.dataset.x || 0)
        const dy = parseFloat(el.dataset.y || 0)
        el.style.left = `calc(50% + ${dx}px)`
        el.style.top = `calc(50% + ${dy}px)`
        // disable float animation on nodes to keep them visually static
        el.classList.add('static')
      })
    } catch (e) {}

    function onPointerEnter() {
      // when hovering, optionally snapshot dataset coords and bounding rects to help debug
      try {
        const debugMode = container.dataset && container.dataset.debug === '2'
        if (!debugMode) return
        const snapshot = nodeRefs.current.map((el, idx) => {
          if (!el) return { idx, ok: false }
          const rect = el.getBoundingClientRect()
          return {
            idx,
            name: el.title || idx,
            datasetX: el.dataset.x,
            datasetY: el.dataset.y,
            leftStyle: el.style.left,
            topStyle: el.style.top,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
          }
        })
        // print a concise table to console for diagnostics
        // eslint-disable-next-line no-console
        console.info('Network3D hover snapshot', snapshot)
        container.dataset.hover = '1'
      } catch (e) {}
    }

    function onPointerLeave() {
      try { delete container.dataset.hover } catch (e) {}
    }

    container.addEventListener('pointerenter', onPointerEnter)
    container.addEventListener('pointerleave', onPointerLeave)
  window.addEventListener('resize', updateLinesToCanvas)

    return () => {
      container.removeEventListener('pointerenter', onPointerEnter)
      container.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', updateLinesToCanvas)
    }
  }, [size])

  return (
    <div ref={containerRef} className="network-3d" style={{ width: size, height: size }}>
      {/* inner div holds the nodes and is the element we rotate; svg stays at container level */}
      <div ref={innerRef} className="network-inner" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', transformStyle: 'preserve-3d', transformOrigin: '50% 50%' }}>
  <canvas ref={canvasRef} className="network-canvas" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
        {NODES.map((n, i) => {
        const Icon = n.Icon
        const COLORS = ['#3776AB','#EE4C2C','#FF6F00','#2496ED','#61DAFB','#06B6D4','#239120','#00599C','#178600','#8b5cf6','#111827','#646cff','#181717']
        const color = COLORS[i % COLORS.length]
        return (
          <div
            key={n.name}
            ref={(el) => (nodeRefs.current[i] = el)}
            className="network-node"
            title={n.name}
            style={{ left: '50%', top: '50%' }}
          >
            <div className="node-inner" style={{ color }}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        )
        })}
      </div>
    </div>
  )
}
