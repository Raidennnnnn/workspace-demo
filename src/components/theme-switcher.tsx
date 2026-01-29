import { Moon, Sun, Monitor, Palette, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export function ThemeSwitcher() {
  const { mode, colorTheme, setMode, setColorTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
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
  )
}
