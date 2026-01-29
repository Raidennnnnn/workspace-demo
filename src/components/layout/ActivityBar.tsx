import { cn } from "@/lib/utils"
import {
  User,
  Database,
  Box,
  Cog,
  MessageSquare,
  UserCircle,
} from "lucide-react"

export type ActivityView = "my" | "dataset" | "model" | "engine" | "message" | "userinfo" | null

interface ActivityBarProps {
  activeView: ActivityView
  onViewChange: (view: ActivityView) => void
}

const topItems = [
  { id: "my" as const, icon: User, label: "My" },
  { id: "dataset" as const, icon: Database, label: "Dataset" },
  { id: "model" as const, icon: Box, label: "Model" },
  { id: "engine" as const, icon: Cog, label: "Engine" },
]

const bottomItems = [
  { id: "message" as const, icon: MessageSquare, label: "Message" },
  { id: "userinfo" as const, icon: UserCircle, label: "User Info" },
]

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  const handleClick = (id: ActivityView) => {
    onViewChange(activeView === id ? null : id)
  }

  return (
    <div className="flex flex-col h-full w-12 bg-zinc-900 border-r border-zinc-800">
      <div className="flex flex-col items-center gap-1 pt-2">
        {topItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-md transition-colors",
              activeView === item.id
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            )}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
      <div className="flex-1" />
      <div className="flex flex-col items-center gap-1 pb-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-md transition-colors",
              activeView === item.id
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            )}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  )
}
