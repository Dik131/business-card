"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AtSign, Book, Briefcase, Code, Github, Globe, Linkedin, Mail, Phone, Terminal, User, Zap } from "lucide-react"

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
      icon: <User className="h-5 w-5" />,
      title: "Dmitrii Ivanov",
      content: "Developer & Tech Support",
    },
    {
      id: 2,
      position: "right",
      icon: <Briefcase className="h-5 w-5" />,
      title: "About Me",
      content: "32 y.o., based in Moscow, Russia (relocated from Turku, Finland). Tech Support Specialist transitioning to Next.js/React Native developer.",
    },
    {
      id: 3,
      position: "left",
      icon: <Zap className="h-5 w-5" />,
      title: "Tech Stack",
      content: "JavaScript/TypeScript, React, Next.js, Node.js, React Native, Electron, Zustand/Redux, SQLite, Git",
    },
    {
      id: 4,
      position: "center",
      icon: <Code className="h-5 w-5" />,
      title: "Current Focus",
      content: "Next.js, Nest.JS, Electron.js, React Native",
    },
    {
      id: 5,
      position: "left",
      icon: <Terminal className="h-5 w-5" />,
      title: "Projects",
      content: "React Native course app, Weeky task manager, Telegram bots, Docsify documentation",
    },
    {
      id: 6,
      position: "right",
      icon: <Book className="h-5 w-5" />,
      title: "Languages",
      content: "English (B2), Russian (native), German (A2), Finnish (A1)",
    },
    {
      id: 7,
      position: "center",
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "ivanov.dk131@gmail.com",
    },
    {
      id: 8,
      position: "left",
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      content: "linkedin.com/in/dmitry-ivanov-47bb4921a",
    },
    {
      id: 9,
      position: "right",
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      content: "github.com/Dik131 | github.com/IvanovDkLACCTV",
    },
    {
      id: 10,
      position: "center",
      icon: <Globe className="h-5 w-5" />,
      title: "Other Contacts",
      content: "BlueSky: ivanovdk.bsky.social | Telegram: @Dik131",
    },
  ]
  
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
            const opacity = useTransform(
              scrollYProgress,
              [
                (index - 0.5) / cards.length,
                index / cards.length,
                (index + 1) / cards.length,
                (index + 1.5) / cards.length,
              ],
              [0, 1, 1, 0]
            )

            if (!isMobile) {
              return (
                <motion.div
                  key={`dot-${card.id}`}
                  className="absolute z-20 h-4 w-4 rounded-full bg-[#FF3B30]"
                  style={{
                    left: currentX,
                    top: yPosition,
                    transform: 'translate(-50%, -50%)',
                    opacity,
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
            const opacity = useTransform(
              scrollYProgress,
              [index / cards.length, (index + 1) / cards.length],
              [0, 1]
            )

            return (
              <motion.div
                key={`line-${card.id}`}
                className="absolute w-full z-10"
                style={{
                  top: `${(index / cards.length) * 100}%`,
                  height: `${(1 / cards.length) * 100}%`,
                  opacity,
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
