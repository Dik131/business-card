"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import TVNoiseBackground from "./tv-noise-background";
import TimelineCard from "./timeline-card";
import TimelineDot from "./TimelineDot";
import TimelineLine from "./TimelineLine";
import { cardsData, CARD_COUNT } from "../lib/data";
import { getTimelineIcon } from "./timeline-icons";
import { getPosition, getXPosition } from "../lib/utils";
import { useDeviceType } from "../hooks/useDeviceType";
import { useTimelineOpacities } from "../hooks/useTimelineOpacities";

export default function BusinessCardTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useDeviceType();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { allDots, allLines } = useTimelineOpacities(scrollYProgress, CARD_COUNT);

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <TVNoiseBackground />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex min-h-[200vh] w-full max-w-7xl flex-col items-center pt-16 pb-[30vh]"
      >
        {/* Отображаем точки (dots) */}
        <div className="absolute left-0 top-0 h-full w-full">
          {!isMobile &&
            cardsData.map((card, index) => (
              <TimelineDot
                key={`dot-${card.id}`}
                x={getXPosition(isMobile, card.position)}
                y={`${(index / CARD_COUNT) * 100}%`}
                opacity={allDots}
                index={index}
              />
            ))}

          {/* Отображаем линии (lines) */}
          {cardsData.slice(0, -1).map((card, index) => (
            <TimelineLine
              key={`line-${card.id}`}
              x1={getXPosition(isMobile, card.position)}
              x2={getXPosition(isMobile, cardsData[index + 1].position)}
              y={`${(index / CARD_COUNT) * 100}%`}
              height={`${(1 / CARD_COUNT) * 100}%`}
              opacity={allLines}
              index={index}
            />
          ))}
        </div>

        {/* Отображаем карточки (cards) */}
        {cardsData.map((card, index) => (
          <TimelineCard
            key={card.id}
            index={index}
            position={getPosition(isMobile, card.position)}
            icon={getTimelineIcon(card.iconId)}
            title={card.title}
            content={card.content}
            scrollYProgress={scrollYProgress}
            total={CARD_COUNT}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}