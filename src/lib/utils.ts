import { CardPosition } from "./types";

export const getPosition = (isMobile: boolean, position: CardPosition): CardPosition => {
  return isMobile ? "center" : position;
};

export const getXPosition = (isMobile: boolean, position: CardPosition): string => {
  if (isMobile) return "50%";
  switch (position) {
    case "left": return "30%";
    case "right": return "70%";
    default: return "50%";
  }
};