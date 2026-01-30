import { cn } from "@/lib/utils"
import type { Panel } from "@/types/workspace"

interface CollapsedPanelIndicatorProps {
  panel: Panel
  index: number
  onClick: () => void
}

export function CollapsedPanelIndicator({ panel, index, onClick }: CollapsedPanelIndicatorProps) {
  return (
    <button
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded",
        "bg-muted/50 hover:bg-muted transition-colors",
        "border border-border",
        "text-sm font-medium text-muted-foreground"
      )}
      onClick={onClick}
      title={panel.itemName}
    >
      {index}
    </button>
  )
}
