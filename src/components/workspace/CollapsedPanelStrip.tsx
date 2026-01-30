import { CollapsedPanelIndicator } from "./CollapsedPanelIndicator"
import { useWorkspace } from "@/hooks/use-workspace"

export function CollapsedPanelStrip() {
  const { collapsedPanels, expandPanel } = useWorkspace()

  if (collapsedPanels.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-1 p-1 bg-muted/20 border-r shrink-0">
      {collapsedPanels.map((panel, idx) => (
        <CollapsedPanelIndicator
          key={panel.id}
          panel={panel}
          index={idx + 1}
          onClick={() => expandPanel(panel.id)}
        />
      ))}
    </div>
  )
}
