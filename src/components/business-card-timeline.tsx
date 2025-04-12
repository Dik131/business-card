"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AtSign, Book, Briefcase, Code, Github, Globe, Linkedin, Mail, Terminal, User, Zap } from "lucide-react"
import Image from "next/image"

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
      position: "center",
      icon: (
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-1 border-white">
          <Image 
            src="/profile.jpeg" 
            alt="Dmitrii Ivanov"
            fill
            className="object-cover"
          />
        </div>
      ),
      title: "Dmitrii Ivanov",
      content: "Developer & Tech Support",
    },
    // ... остальные карточки без изменений
  ]

  // Создаем массив трансформаций для точек
  const dotOpacities = cards.map((_, index) => 
    useTransform(
      scrollYProgress,
      [
        (index - 0.5) / cards.length,
        index / cards.length,
        (index + 1) / cards.length,
        (index + 1.5) / cards.length,
      ],
      [0, 1, 1, 0]
    )
  )

  // Создаем массив трансформаций для линий
  const lineOpacities = cards.map((_, index) => 
    useTransform(
      scrollYProgress,
      [index / cards.length, (index + 1) / cards.length],
      [0, 1]
    )
  )

  const getPosition = (position: string) => {
    if (isMobile) return "center"
    return position
  }

  const getXPosition = (position: string) => {
    if (isMobile) return "50%"
    return position === "left" ? "30%" : position === "right" ? "70%" : "50%"
  }

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <TVNoiseBackground />
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto flex min-h-[200vh] w-full max-w-7xl flex-col items-center py-32 z-10"
      >
        <div className="absolute left-0 top-0 h-full w-full">
          {cards.map((card, index) => {
            const currentX = getXPosition(card.position)
            const yPosition = `${(index / cards.length) * 100}%`

            if (!isMobile) {
              return (
                <motion.div
                  key={`dot-${card.id}`}
                  className="absolute z-20 h-4 w-4 rounded-full bg-[#FF3B30]"
                  style={{
                    left: currentX,
                    top: yPosition,
                    transform: 'translate(-50%, -50%)',
                    opacity: dotOpacities[index],
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              )
            }
            return null
          })}

          {cards.map((card, index) => {
            if (index === cards.length - 1) return null
            const currentX = getXPosition(card.position)
            const nextCard = cards[index + 1]
            const nextX = nextCard ? getXPosition(nextCard.position) : undefined

            return (
              <motion.div
                key={`line-${card.id}`}
                className="absolute w-full z-10"
                style={{
                  top: `${(index / cards.length) * 100}%`,
                  height: `${(1 / cards.length) * 100}%`,
                  opacity: lineOpacities[index],
                }}
              >
                <svg className="h-full w-full overflow-visible">
                  <line
                    x1={currentX}
                    y1="0%"
                    x2={nextX}
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