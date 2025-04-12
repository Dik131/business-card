"use client"

import { useEffect, useRef } from "react"

export default function TVNoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    let animationFrameId: number
    let scanLineOffset = 0
    let lastGlitchTime = 0
    let isGlitching = false

    const drawNoise = (time: number) => {
      if (!ctx || !canvas) return

      // Светло-серый фон
      ctx.fillStyle = "rgba(230, 230, 230, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      scanLineOffset += 0.5

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width
        const y = Math.floor(i / 4 / canvas.width)

        // Эффект горизонтальных линий
        const scanLineEffect = (y + Math.floor(scanLineOffset)) % 3 === 0 ? 0.8 : 1

        const randomValue = Math.random()
        let value

        if (randomValue < 0.3) {
          value = 180 + Math.floor(Math.random() * 30) // почти белый
        } else if (randomValue < 0.7) {
          value = 140 + Math.floor(Math.random() * 40)
        } else {
          value = 100 + Math.floor(Math.random() * 40)
        }

        value = Math.floor(value * scanLineEffect)

        if (isGlitching && y % 20 < 10) {
          value = Math.floor(180 + Math.random() * 75)
        }

        data[i] = data[i + 1] = data[i + 2] = value
        data[i + 3] = 90 // Альфа: хорошо заметно, но не слишком резко
      }

      ctx.putImageData(imageData, 0, 0)

     // Случайный "глич" каждые 7–11 секунд
      if (time - lastGlitchTime > 7000 + Math.random() * 4000) {
        isGlitching = true
        lastGlitchTime = time
        setTimeout(() => {
          isGlitching = false
        }, 100 + Math.random() * 200)
      }


      // Полупрозрачные горизонтальные искажения
      if (isGlitching) {
        for (let i = 0; i < 2; i++) {
          const lineY = Math.random() * canvas.height
          const lineHeight = 1 + Math.random() * 2
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
          ctx.fillRect(0, lineY, canvas.width, lineHeight)
        }
      }

      // Виньетка
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.3
      )
      gradient.addColorStop(0, "rgba(0,0,0,0)")
      gradient.addColorStop(1, "rgba(0,0,0,0.25)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(drawNoise)
    }

    animationFrameId = requestAnimationFrame(drawNoise)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
