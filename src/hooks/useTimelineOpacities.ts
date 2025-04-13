import type { MotionValue } from "framer-motion";
import { useTransform } from "framer-motion";

export function useTimelineOpacities(
  scrollYProgress: MotionValue<number>,
  cardCount: number
) {
  // Один MotionValue для всех точек
  const allDots = useTransform(scrollYProgress, (value) => {
    return Array.from({ length: cardCount }, (_, i) => {
      const start = (i - 0.5) / cardCount;
      const peakStart = i / cardCount;
      const peakEnd = (i + 1) / cardCount;
      const end = (i + 1.5) / cardCount;
      
      if (value < start || value > end) return 0;
      if (value >= peakStart && value <= peakEnd) return 1;
      if (value < peakStart) return (value - start) / (peakStart - start);
      return (end - value) / (end - peakEnd);
    });
  });

  // Один MotionValue для всех линий
  const allLines = useTransform(scrollYProgress, (value) => {
    return Array.from({ length: cardCount - 1 }, (_, i) => {
      const start = i / cardCount;
      const end = (i + 1) / cardCount;
      return Math.max(0, Math.min(1, (value - start) / (end - start)));
    });
  });

  return { allDots, allLines };
}