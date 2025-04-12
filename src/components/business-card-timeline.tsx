"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

  return (
    <div className="relative min-h-screen w-full bg-gray-300">
      <TVNoiseBackground />

      <div
        ref={containerRef}
        className="relative mx-auto flex min-h-[200vh] w-full max-w-7xl flex-col items-center py-32"
      >
        {/* Timeline connecting lines */}
        <div className="absolute left-0 top-0 h-full w-full">
          {cards.map((card, index) => {
            if (index === cards.length - 1) return null

            const nextCard = cards[index + 1]
            const currentPosition = isMobile ? "center" : card.position
            const nextPosition = isMobile ? "center" : nextCard.position

            const opacity = useTransform(scrollYProgress, [index / cards.length, (index + 1) / cards.length], [0, 1])

            return (
              <motion.div
                key={card.id}
                className="absolute h-[calc(100%/8)] w-full"
                style={{
                  top: `${(index / cards.length) * 100}%`,
                  opacity: opacity,
                }}
              >
                <svg className="h-full w-full">
                  <line
                    x1={currentPosition === "left" ? "30%" : currentPosition === "right" ? "70%" : "50%"}
                    y1="0%"
                    x2={nextPosition === "left" ? "30%" : nextPosition === "right" ? "70%" : "50%"}
                    y2="100%"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>
            )
          })}
        </div>

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
          />
        ))}
      </div>
    </div>
  )
}
