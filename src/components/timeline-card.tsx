"use client"

import { type ReactNode, useRef, JSX } from "react"
import { motion, useInView, type MotionValue, useTransform } from "framer-motion"

interface TimelineCardProps {
  index: number
  position: "left" | "right" | "center"
  icon: ReactNode
  title: string
  content: string | JSX.Element
  scrollYProgress: MotionValue<number>
  total: number
  isMobile: boolean
}

export default function TimelineCard({
  index,
  position,
  icon,
  title,
  content,
  scrollYProgress,
  total,
  isMobile: _isMobile,
}: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.5 })

  const start = index / total
  const end = (index + 1) / total

  const opacity = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0.8, 1, 1, 0.8])

  const getPositionStyles = (): string => {
    switch (position) {
      case "left":
        return "md:mr-auto md:ml-12 md:pr-12"
      case "right":
        return "md:ml-auto md:mr-12 md:pl-12"
      default:
        return "mx-auto"
    }
  }

  return (
    <div ref={cardRef} className={`relative w-full max-w-2xl ${index === 0 ? 'mt-0' : 'mt-[20vh] md:mt-[30vh]'} ${index === total - 1 ? 'mb-[5vh] md:mb-[15vh]' : 'mb-[20vh] md:mb-[30vh]'} ${getPositionStyles()}`}>
      <motion.div
        className="relative z-10 overflow-hidden rounded-xl bg-[#2A2A2A] p-8 shadow-lg backdrop-blur-sm pointer-events-none"
        style={{ opacity, scale }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.5,
          ...(index === total - 1 && !_isMobile && {
            y: isInView ? [0, -10, 0] : 0
          })
        }}
        transition={{
          duration: 0.5,
          ...(index === total - 1 && !_isMobile && {
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          })
        }}
      >
        <div className="pointer-events-auto">
        <div className="flex items-center gap-3 text-white relative z-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF3B30]">{icon}</div>
          <h3 className="text-3xl font-bold">{title}</h3>
        </div>
        <div className="mt-6 text-xl leading-relaxed text-silver relative z-20">{content}</div>
        </div>
      </motion.div>
    </div>
  )
}