"use client"

import { motion } from "framer-motion"
import { MotionValue } from "framer-motion"

interface TimelineLineProps {
  x1: string
  x2: string
  y: string
  height: string
  opacity: MotionValue<number>
}

export default function TimelineLine({ x1, x2, y, height, opacity }: TimelineLineProps) {
  return (
    <motion.div
      className="absolute w-full z-10"
      style={{
        top: y,
        height,
        opacity,
      }}
    >
      <svg className="h-full w-full overflow-visible">
        <line
          x1={x1}
          y1="0%"
          x2={x2}
          y2="100%"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  )
}