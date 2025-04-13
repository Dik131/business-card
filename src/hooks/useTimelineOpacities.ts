import { MotionValue, useTransform } from "framer-motion";
import { CARD_COUNT } from "../lib/data";

export function useTimelineOpacities(scrollYProgress: MotionValue<number>, cardCount: number) {
  const dotOpacities = Array.from({ length: cardCount }, (_, i) =>
    useTransform(
      scrollYProgress,
      [
        (i - 0.5) / cardCount,
        i / cardCount,
        (i + 1) / cardCount,
        (i + 1.5) / cardCount,
      ],
      [0, 1, 1, 0]
    )
  );

  const lineOpacities = Array.from({ length: cardCount - 1 }, (_, i) =>
    useTransform(
      scrollYProgress,
      [i / cardCount, (i + 1) / cardCount],
      [0, 1]
    )
  );

  return { dotOpacities, lineOpacities };
}
