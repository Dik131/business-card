import { TimelineCard } from "./types"

export const cardsData: TimelineCard[] = [
  {
    id: 1,
    position: "center",
    iconId: "profile",
    title: "Dmitrii Ivanov",
    content: "Developer & Tech Support",
  },
  {
    id: 2,
    position: "right",
    iconId: "briefcase",
    title: "About Me",
    content: "32 y.o., based in Moscow, Russia (relocated from Turku, Finland). Tech Support Specialist transitioning to Next.js/React Native developer.",
  },
  {
    id: 3,
    position: "left",
    iconId: "zap",
    title: "Tech Stack",
    content: "JavaScript/TypeScript, React, Next.js, Node.js (Express.js and Nest.js), React Native, Electron, Zustand/Redux, SQLite, Git",
  },
  {
    id: 4,
    position: "center",
    iconId: "code",
    title: "Current Focus",
    content: "Next.js, Nest.JS, Electron.js, React Native",
  },
  {
    id: 5,
    position: "left",
    iconId: "terminal",
    title: "Projects",
    content: "React Native course app, Weekly task manager, Telegram bots, Docsify documentation",
  },
  {
    id: 6,
    position: "right",
    iconId: "book",
    title: "Languages",
    content: "English (B2), Russian (native), German (A2), Finnish (A1)",
  },
  {
    id: 7,
    position: "center",
    iconId: "mail",
    title: "Email",
    content: "ivanov.dk131@gmail.com",
  },
  {
    id: 8,
    position: "left",
    iconId: "linkedin",
    title: "LinkedIn",
    content: "linkedin.com/in/dmitry-ivanov-47bb4921a",
  },
  {
    id: 9,
    position: "right",
    iconId: "github",
    title: "GitHub",
    content: "github.com/Dik131 | github.com/IvanovDkLACCTV",
  },
  {
    id: 10,
    position: "center",
    iconId: "globe",
    title: "Other Contacts",
    content: "BlueSky: ivanovdk.bsky.social | Telegram: @Dik131",
  }
]

export const CARD_COUNT = cardsData.length
