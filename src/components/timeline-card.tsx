"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type MotionValue, useTransform } from "framer-motion"

interface TimelineCardProps {
  index: number
  position: string
  icon: ReactNode
  title: string
  content: string
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
  isMobile,
}: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.5 })

  // Calculate the progress range for this card
  const start = index / total
  const end = (index + 1) / total

  // Transform the scroll progress to the card's opacity and scale
  const opacity = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0.5, 1, 1, 0.5])

  // Position styles
  const getPositionStyles = () => {
    switch (position) {
      case "left":
        return "md:mr-auto md:ml-12 md:pr-12"
      case "right":
        return "md:ml-auto md:mr-12 md:pl-12"
      default:
        return "mx-auto"
    }
  }

  // Get dot position based on card position
  const getDotPosition = () => {
    switch (position) {
      case "left":
        return "right-0 translate-x-1/2"
      case "right":
        return "left-0 -translate-x-1/2"
      default:
        return "left-1/2 -translate-x-1/2"
    }
  }

  return (
    <div ref={cardRef} className={`relative my-24 w-full max-w-md ${getPositionStyles()}`}>
      {/* Red dot - only show on desktop and positioned at the top of the card */}
      {!isMobile && (
        <motion.div
          className={`absolute top-0 z-10 h-4 w-4 -translate-y-1/2 rounded-full bg-[#FF3B30] ${getDotPosition()}`}
          initial={{ scale: 1 }}
          animate={{ scale: isInView ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isInView ? Number.POSITIVE_INFINITY : 0, repeatDelay: 3 }}
        />
      )}

      {/* Card */}
      <motion.div
        className="relative z-0 overflow-hidden rounded-xl bg-[#2A2A2A] p-6 shadow-lg"
        style={{ opacity, scale }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF3B30]">{icon}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="mt-4 text-silver">{content}</p>
      </motion.div>
    </div>
  )
}
