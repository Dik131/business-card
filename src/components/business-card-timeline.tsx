"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { AtSign, Briefcase, Github, Linkedin, Mail, Phone, User, Zap } from "lucide-react"

import TVNoiseBackground from "./tv-noise-background"
import TimelineCard from "./timeline-card"

export default function BusinessCardTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [isMobile, setIsMobile] = useState(false)
  const [dotOpacities, setDotOpacities] = useState<number[]>([])
  const [dotScales, setDotScales] = useState<number[]>([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    const calculateDotAnimations = () => {
      const newDotOpacities: number[] = []
      const newDotScales: number[] = []

      cards.forEach((card, index) => {
        // Calculate the scroll range where this dot should be visible
        const visibilityStart = Math.max(0, (index - 0.5) / cards.length)
        const visibilityPeak = (index + 0.5) / cards.length
        const visibilityEnd = Math.min(1, (index + 1.5) / cards.length)

        // Create transform values for opacity and scale
        let dotOpacity: number
        let dotScale: number

        if (scrollYProgress.get() >= visibilityStart && scrollYProgress.get() <= visibilityEnd) {
          if (scrollYProgress.get() < visibilityPeak) {
            dotOpacity = (scrollYProgress.get() - visibilityStart) / (visibilityPeak - visibilityStart)
            dotScale = 0.5 + (0.5 * (scrollYProgress.get() - visibilityStart)) / (visibilityPeak - visibilityStart)
          } else {
            dotOpacity = 1 - (scrollYProgress.get() - visibilityPeak) / (visibilityEnd - visibilityPeak)
            dotScale = 1 - (0.5 * (scrollYProgress.get() - visibilityPeak)) / (visibilityEnd - visibilityPeak)
          }
        } else {
          dotOpacity = 0
          dotScale = 0.5
        }

        newDotOpacities.push(dotOpacity)
        newDotScales.push(dotScale)
      })

      setDotOpacities(newDotOpacities)
      setDotScales(newDotScales)
    }

    calculateDotAnimations()

    scrollYProgress.onChange(calculateDotAnimations)

    return () => {
      scrollYProgress.clearListeners()
    }
  }, [scrollYProgress])

  const cards = [
    {
      id: 1,
      position: "left",
      icon: <User className="h-5 w-5" />,
      title: "John Doe",
      content: "Creative Developer & Designer",
    },
    {
      id: 2,
      position: "center",
      icon: <Briefcase className="h-5 w-5" />,
      title: "Experience",
      content: "5+ years in web development, UI/UX design, and interactive media",
    },
    {
      id: 3,
      position: "right",
      icon: <Zap className="h-5 w-5" />,
      title: "Skills",
      content: "React, Next.js, Three.js, Framer Motion, Tailwind CSS, TypeScript",
    },
    {
      id: 4,
      position: "center",
      icon: <Github className="h-5 w-5" />,
      title: "Projects",
      content: "Interactive websites, 3D experiences, and creative coding experiments",
    },
    {
      id: 5,
      position: "left",
      icon: <Mail className="h-5 w-5" />,
      title: "Contact",
      content: "hello@johndoe.com",
    },
    {
      id: 6,
      position: "center",
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
    },
    {
      id: 7,
      position: "right",
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      content: "linkedin.com/in/johndoe",
    },
    {
      id: 8,
      position: "center",
      icon: <AtSign className="h-5 w-5" />,
      title: "Social",
      content: "@johndoe across platforms",
    },
  ]

  // Adjust positions for mobile
  const getPosition = (position: string) => {
    if (isMobile) {
      return "center"
    }
    return position
  }

  // Get the horizontal position percentage based on card position
  const getHorizontalPosition = (position: string) => {
    switch (position) {
      case "left":
        return 30
      case "right":
        return 70
      default:
        return 50
    }
  }

  // Generate zigzag path for the timeline
  const generateZigzagPath = () => {
    let path = ""

    // Start at the top
    path += `M 50,0 `

    // Connect through each card position
    cards.forEach((card, index) => {
      const position = isMobile ? "center" : card.position
      const x = getHorizontalPosition(position)
      const y = ((index + 1) / (cards.length + 1)) * 100

      path += `L ${x},${y} `
    })

    // End at the bottom
    path += `L 50,100`

    return path
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-300">
      <TVNoiseBackground />

      <div
        ref={containerRef}
        className="relative mx-auto flex min-h-[200vh] w-full max-w-7xl flex-col items-center py-32"
      >
        {/* Main zigzag line */}
        <svg className="absolute left-0 top-0 h-full w-full" preserveAspectRatio="none">
          <motion.path
            d={generateZigzagPath()}
            stroke="white"
            strokeWidth="2"
            fill="none"
            style={{
              pathLength: scrollYProgress,
            }}
          />
        </svg>

        {/* Red dots at connection points - only on desktop */}
        {!isMobile &&
          cards.map((card, index) => {
            const position = card.position
            const x = getHorizontalPosition(position)
            const y = ((index + 1) / (cards.length + 1)) * 100

            return (
              <motion.div
                key={`dot-${card.id}`}
                className="absolute z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF3B30]"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: dotOpacities[index],
                  scale: dotScales[index],
                }}
              />
            )
          })}

        {cards.map((card, index) => (
          <TimelineCard
            key={card.id}
            index={index}
            position={getPosition(card.position)}
            icon={card.icon}
            title={card.title}
            content={card.content}
            scrollYProgress={scrollYProgress}
            total={cards.length}
            isMobile={isMobile}
            dotPosition={getHorizontalPosition(card.position)}
          />
        ))}
      </div>
    </div>
  )
}
