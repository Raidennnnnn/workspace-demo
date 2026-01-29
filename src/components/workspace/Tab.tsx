import { X, Database, Box, Cog } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PanelType, TabId } from "@/types/workspace"

interface TabProps {
  id: TabId
  title: string
  type: PanelType
  isActive: boolean
  onSwitch: (tabId: TabId) => void
  onClose: (tabId: TabId) => void
}

const typeIcons = {
  dataset: Database,
  model: Box,
  engine: Cog,
}

export function Tab({ id, title, type, isActive, onSwitch, onClose }: TabProps) {
  const Icon = typeIcons[type]

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 border-r cursor-pointer shrink-0",
        "hover:bg-muted/50 transition-colors",
        isActive ? "bg-background border-b-2 border-b-primary" : "bg-muted/30"
      )}
      onClick={() => onSwitch(id)}
    >
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-sm truncate max-w-32">{title}</span>
      <button
        className="ml-1 p-0.5 rounded hover:bg-muted"
        onClick={(e) => {
          e.stopPropagation()
          onClose(id)
        }}
      >
        <X className="h-3 w-3 text-muted-foreground" />
      </button>
    </div>
  )
}
