import { JSX } from "react";

export type CardPosition = "left" | "right" | "center";

export interface TimelineCard {
    id: number
    position: CardPosition
    iconId: string
    title: string
    content: string | JSX.Element
}

