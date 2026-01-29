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
  Monitor,
  Palette,
  Check,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/use-theme"
import type { ColorTheme, Mode } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const colorThemes: { value: ColorTheme; label: string; color: string }[] = [
  { value: "default", label: "Default", color: "bg-neutral-500" },
  { value: "purple", label: "Purple", color: "bg-[oklch(0.33_0.16_288)]" },
  { value: "green", label: "Green", color: "bg-[oklch(0.66_0.13_166)]" },
  { value: "blue", label: "Blue", color: "bg-[oklch(0.37_0.23_264)]" },
  { value: "yellow", label: "Yellow", color: "bg-[oklch(0.81_0.16_85)]" },
  { value: "pink", label: "Pink", color: "bg-[oklch(0.59_0.23_357)]" },
]

const modes: { value: Mode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

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
  const { mode, colorTheme, setMode, setColorTheme } = useTheme()

  const handleTopClick = (id: ActivityView) => {
    onViewChange(activeView === id ? null : id)
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" title="Theme">
              <Palette className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-48">
            <DropdownMenuLabel>Mode</DropdownMenuLabel>
            {modes.map(({ value, label, icon: Icon }) => (
              <DropdownMenuItem
                key={value}
                onClick={() => setMode(value)}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                {mode === value && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
            {colorThemes.map(({ value, label, color }) => (
              <DropdownMenuItem
                key={value}
                onClick={() => setColorTheme(value)}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("h-4 w-4 rounded-full", color)} />
                  {label}
                </span>
                {colorTheme === value && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
