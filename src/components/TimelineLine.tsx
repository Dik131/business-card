"use client"

import { motion, useTransform } from "framer-motion"
import { MotionValue } from "framer-motion"

interface TimelineLineProps {
  x1: string
  x2: string
  y: string
  height: string
  opacity: MotionValue<number[]>
  index: number
}

export default function TimelineLine({ x1, x2, y, height, opacity, index }: TimelineLineProps) {
  return (
    <motion.div
      className="absolute w-full z-10"
      style={{
        top: y,
        height,
        opacity: useTransform(opacity, (values: number[]) => values[index]),
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