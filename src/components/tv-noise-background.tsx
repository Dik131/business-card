"use client"

import { useEffect, useRef } from "react"

export default function TVNoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // TV noise animation variables
    let animationFrameId: number
    let scanLineOffset = 0
    let lastGlitchTime = 0
    let isGlitching = false

    // Draw TV static noise
    const drawNoise = (time: number) => {
      if (!ctx || !canvas) return

      // Clear canvas with light gray background
      ctx.fillStyle = "rgba(180, 180, 180, 1)" // Light gray background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create noise
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      // Scan lines effect
      scanLineOffset += 0.5

      // Generate noise pixels with more contrast
      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width
        const y = Math.floor(i / 4 / canvas.width)

        // Scan lines effect (horizontal lines)
        const scanLineEffect = (y + Math.floor(scanLineOffset)) % 3 === 0 ? 0.7 : 1

        // Create more contrast with darker pixels
        // Random value between 0-255 with higher probability of dark pixels
        const randomValue = Math.random()
        let value

        if (randomValue < 0.4) {
          // 40% chance of dark pixel
          value = Math.floor(Math.random() * 40) // Very dark (0-40)
        } else if (randomValue < 0.7) {
          // 30% chance of mid-tone
          value = 40 + Math.floor(Math.random() * 80) // Mid-tone (40-120)
        } else {
          // 30% chance of light pixel
          value = 120 + Math.floor(Math.random() * 135) // Light (120-255)
        }

        value = Math.floor(value * scanLineEffect)

        // Add glitch effect
        if (isGlitching && y % 20 < 10) {
          value = Math.floor(Math.random() * 255)
        }

        // Apply to all RGB channels for grayscale
        data[i] = value // R
        data[i + 1] = value // G
        data[i + 2] = value // B
        data[i + 3] = 80 // Alpha (increased opacity for more visible effect)
      }

      ctx.putImageData(imageData, 0, 0)

      // Random glitch effect (every 2-5 seconds)
      if (time - lastGlitchTime > 2000 + Math.random() * 3000) {
        isGlitching = true
        lastGlitchTime = time
        setTimeout(
          () => {
            isGlitching = false
          },
          100 + Math.random() * 200,
        )
      }

      // Add occasional horizontal distortion lines
      if (isGlitching) {
        for (let i = 0; i < 3; i++) {
          const lineY = Math.random() * canvas.height
          const lineHeight = 1 + Math.random() * 3
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
          ctx.fillRect(0, lineY, canvas.width, lineHeight)
        }
      }

      // Vignette effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5,
      )
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Continue animation loop
      animationFrameId = requestAnimationFrame(drawNoise)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(drawNoise)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed left-0 top-0 -z-10 h-full w-full" />
}
