import { useRef, useEffect, useMemo } from 'react'

interface Star {
  x: number // 0–1
  y: number // 0–1
  radius: number
  baseAlpha: number // 基础亮度
  twinkleSpeed: number // 闪烁频率
  twinklePhase: number // 初始相位
  twinkleAmp: number // 闪烁幅度
}

function generateStars(count: number): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random() * 0.85, // 偏上方分布，留出底部空间
      radius: 0.4 + Math.random() * 1.4, // 小圆点
      baseAlpha: 0.15 + Math.random() * 0.35, // 基础亮度偏低
      twinkleSpeed: 0.3 + Math.random() * 2.0, // 不同闪烁速度
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleAmp: 0.2 + Math.random() * 0.6, // 闪烁幅度
    })
  }
  return stars
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  const stars = useMemo(() => generateStars(80), [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    let animId: number

    function resize() {
      const dpr = window.devicePixelRatio
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    function animate(timestamp: number) {
      const time = timestamp * 0.001
      const w = window.innerWidth
      const h = window.innerHeight

      // 灰黑背景
      ctx.fillStyle = '#1a1d21'
      ctx.fillRect(0, 0, w, h)

      // 绘制星星
      for (const star of stars) {
        const sx = star.x * w
        const sy = star.y * h

        // 使用 sin 产生闪烁效果：在 baseAlpha 上下波动
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * star.twinkleAmp
        const alpha = Math.max(0, Math.min(1, star.baseAlpha + twinkle))

        if (alpha < 0.02) continue // 太暗不画

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = '#ffffff'

        // 绘制发光星点：中心白点 + 外围光晕
        ctx.beginPath()
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2)
        ctx.fill()

        // 较亮的星星加光晕
        if (alpha > 0.4) {
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.radius * 4)
          glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.6})`)
          glow.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(sx, sy, star.radius * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [stars])

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ display: 'block' }} />
}
