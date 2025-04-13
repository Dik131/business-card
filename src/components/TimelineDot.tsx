"use client"

import { motion } from "framer-motion"
import { MotionValue } from "framer-motion"

interface TimelineDotProps {
  x: string
  y: string
  opacity: MotionValue<number>
}

export default function TimelineDot({ x, y, opacity }: TimelineDotProps) {
  return (
    <motion.div
      className="absolute z-20 h-4 w-4 rounded-full bg-[#FF3B30]"
      style={{
        left: x,
        top: y,
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