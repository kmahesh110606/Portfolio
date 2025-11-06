import React, { useEffect, useRef } from 'react'

export default function VaraText({ text, fontUrl, fontSize = 96, strokeWidth = 2 }) {
  const idRef = useRef('vara-' + Math.random().toString(36).slice(2))

  useEffect(() => {
    let varaInstance = null
    let mounted = true

    // dynamic import so bundlers don't try to evaluate on SSR/early
    import('vara').then((mod) => {
      if (!mounted) return
      const Vara = mod.default || mod
      try {
        varaInstance = new Vara(
          `#${idRef.current}`,
          fontUrl || 'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json',
          [
            {
              text: text,
              fontSize: fontSize,
              strokeWidth: strokeWidth,
              // small delay to make it feel deliberate
              duration: 2000,
            },
          ],
        )
      } catch (err) {
        // fall back gracefully
        console.error('Vara init error', err)
        const el = document.getElementById(idRef.current)
        if (el) el.textContent = text
      }
    }).catch((e) => {
      console.error('Failed to load Vara:', e)
      const el = document.getElementById(idRef.current)
      if (el) el.textContent = text
    })

    return () => {
      mounted = false
      try {
        if (varaInstance && typeof varaInstance.remove === 'function') varaInstance.remove()
      } catch (e) {}
      const el = document.getElementById(idRef.current)
      if (el) el.innerHTML = ''
    }
  }, [text, fontUrl, fontSize, strokeWidth])

  return (
    <div
      id={idRef.current}
      className="vara-text z-[20] block select-none"
      style={{ overflow: 'visible', paddingLeft: 6, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
