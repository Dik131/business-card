import { TimelineCard } from "./types"
import React, { JSX } from "react"

export const cardsData: TimelineCard[] = [
  {
    id: 1,
    position: "center",
    iconId: "face",
    title: "Dmitrii Ivanov",
    content: (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <img
            src="/profile.jpeg"
            alt="Dmitrii Ivanov"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
        </div>
        <div>
          <p className="text-3xl font-bold mb-2">React/React Native Developer</p> 
          <p className="text-3xl font-bold mb-2">& Tech Support</p>
          <p className="text-xl text-gray-300">Moscow, Russia</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    position: "left",
    iconId: "code",
    title: "Tech Stack & Focus",
    content: (
      <div className="space-y-6">
        <p><strong>Frontend:</strong> React, Next.js, TypeScript</p>
        <p><strong>Backend:</strong> Node.js, Express, Nest.js, Deno, Bun</p>
        <p><strong>Mobile & Desktop:</strong> React Native + Expo, Lynx, Electron, Tauri</p>
        <p><strong>UI Libraries:</strong> Shadcn, NativeWind, TailwindCSS, StyleX</p>
        <p><strong>Tools:</strong> Zustand, Redux, SQLite, Git, SCSS</p>
        <p><strong>Docs:</strong> Docsify, Docusaurus, Fumadocus</p>
        <p><strong>Workspace & Management:</strong> Jira, Obsidian, Bitrix24, MS Office</p>
        <p><strong>Currently Learning:</strong> Next.js, Nest.js, Electron, Lynx</p>
      </div>
    ),
  },
  {
    id: 3,
    position: "right",
    iconId: "terminal",
    title: "Recent Projects",
    content: (
      <div className="space-y-6">
        <div className="project-card p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
          <h3 className="text-lg font-semibold mb-2">Course App</h3>
          <p className="text-sm text-gray-300 mb-3">A mobile application for learning and education</p>
          <div className="flex gap-3 relative z-20">
            <a href="https://drive.google.com/file/d/1qINTBb7q1WqKikYpudwz7-wWV5pYDfyw/view?usp=drivesdk" 
               className="inline-block px-3 py-1 bg-[#FF3B30] text-white rounded-full text-sm hover:bg-[#E6352B] transition-colors cursor-pointer relative z-20 pointer-events-auto" 
               target="_blank" 
               rel="noopener noreferrer">Download APK</a>
            <a href="https://github.com/Dik131/course-app" 
               className="inline-block px-3 py-1 border border-[#FF3B30] text-[#FF3B30] rounded-full text-sm hover:bg-[#FF3B30] hover:text-white transition-colors cursor-pointer relative z-20 pointer-events-auto" 
               target="_blank" 
               rel="noopener noreferrer">View Code</a>
          </div>
        </div>

        <div className="project-card p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
          <h3 className="text-lg font-semibold mb-2">Weeky</h3>
          <p className="text-sm text-gray-300 mb-3">Task manager with IndexedDB for offline data persistence</p>
          <div className="flex gap-3 relative z-20">
            <a href="https://weeky.netlify.app/" 
               className="inline-block px-3 py-1 bg-[#FF3B30] text-white rounded-full text-sm hover:bg-[#E6352B] transition-colors cursor-pointer relative z-20 pointer-events-auto" 
               target="_blank" 
               rel="noopener noreferrer">Live Demo</a>
            <a href="https://github.com/Dik131/weeky" 
               className="inline-block px-3 py-1 border border-[#FF3B30] text-[#FF3B30] rounded-full text-sm hover:bg-[#FF3B30] hover:text-white transition-colors cursor-pointer relative z-20 pointer-events-auto" 
               target="_blank" 
               rel="noopener noreferrer">View Code</a>
          </div>
        </div>

        <div className="project-card p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
          <h3 className="text-lg font-semibold mb-2">Other Projects</h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>Telegram Bots for automation and user interaction</li>
            <li>Technical Documentation for various projects</li>
            <li>Automation Scripts for workflow optimization</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    position: "center",
    iconId: "github",
    title: "Contact Me",
    content: (
      <div className="space-y-4 text-center">
        <p>
          <a href="mailto:ivanov.dk131@gmail.com" className="text-[#FF3B30] hover:underline">ivanov.dk131@gmail.com</a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/dmitry-ivanov-47bb4921a/" className="text-[#FF3B30] hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>{" | "}
          <a href="https://github.com/Dik131" className="text-[#FF3B30] hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>{" | "}
          <a href="https://t.me/Dik131" className="text-[#FF3B30] hover:underline" target="_blank" rel="noopener noreferrer">Telegram</a>
        </p>
        <p>
          <a href="https://bsky.app/profile/ivanovdk.bsky.social" className="text-[#FF3B30] hover:underline" target="_blank" rel="noopener noreferrer">BlueSky: ivanovdk.bsky.social</a>
        </p>
      </div>
    ),
  }
]

export const CARD_COUNT = cardsData.length
