import { X, Database, Box, Cog, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PanelContent } from "./PanelContent"
import { useWorkspace } from "@/hooks/use-workspace"
import { cn } from "@/lib/utils"
import type { Panel } from "@/types/workspace"

interface PanelContainerProps {
  panel: Panel
  className?: string
}

const typeIcons = {
  dataset: Database,
  model: Box,
  engine: Cog,
  settings: Settings,
}

export function PanelContainer({ panel, className }: PanelContainerProps) {
  const { closePanel } = useWorkspace()
  const Icon = typeIcons[panel.type]

  return (
    <div className={cn("h-full flex flex-col bg-background border", className)}>
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30 shrink-0">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium truncate">{panel.itemName}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => closePanel(panel.id)}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <PanelContent panel={panel} />
      </div>
    </div>
  )
}
