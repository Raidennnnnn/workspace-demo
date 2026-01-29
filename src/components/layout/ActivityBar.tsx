import { Button } from "@/components/ui/button"
import {
  User,
  Database,
  Box,
  Cog,
  MessageSquare,
  UserCircle,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

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
  const { theme, setTheme } = useTheme()

  const handleTopClick = (id: ActivityView) => {
    onViewChange(activeView === id ? null : id)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex flex-col h-full w-12 bg-muted/50 border-r">
      <div className="flex flex-col items-center gap-1 pt-2">
        {topItems.map((item) => {
          const isActive = activeView === item.id
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={isActive ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
              onClick={() => handleTopClick(item.id)}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          )
        })}
      </div>
      <div className="flex-1" />
      <div className="flex flex-col items-center gap-1 pb-2">
        {bottomItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            onClick={() => {}}
            title={item.label}
          >
            <item.icon className="h-5 w-5" />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </div>
  )
}
