import { Database, Box, Cog, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Panel } from "@/types/workspace"

interface CollapsedPanelIndicatorProps {
  panel: Panel
  onClick: () => void
}

const typeIcons = {
  dataset: Database,
  model: Box,
  engine: Cog,
  settings: Settings,
}

export function CollapsedPanelIndicator({ panel, onClick }: CollapsedPanelIndicatorProps) {
  const Icon = typeIcons[panel.type]

  return (
    <button
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded",
        "bg-muted/50 hover:bg-muted transition-colors",
        "border border-border"
      )}
      onClick={onClick}
      title={panel.itemName}
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
    </button>
  )
}
