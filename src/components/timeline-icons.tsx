'use client'

import {
  Book,
  Briefcase,
  Code,
  Github,
  Globe,
  Linkedin,
  Mail,
  Terminal,
  Zap
} from "lucide-react"
import Image from "next/image"

export function getTimelineIcon(iconId: string) {
  const baseIconClass = "h-5 w-5"

  switch (iconId) {
    case "profile":
      return (
        <div className="relative h-16 w-16 rounded-full overflow-hidden border border-white">
          <Image
            src="/profile.jpeg"
            alt="Dmitrii Ivanov"
            fill
            className="object-cover"
            priority
          />
        </div>
      )
    case "briefcase":
      return <Briefcase className={baseIconClass} />
    case "zap":
      return <Zap className={baseIconClass} />
    case "code":
      return <Code className={baseIconClass} />
    case "terminal":
      return <Terminal className={baseIconClass} />
    case "book":
      return <Book className={baseIconClass} />
    case "mail":
      return <Mail className={baseIconClass} />
    case "linkedin":
      return <Linkedin className={baseIconClass} />
    case "github":
      return <Github className={baseIconClass} />
    case "globe":
      return <Globe className={baseIconClass} />
    default:
      return <Zap className={baseIconClass} />
  }
}
