import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { CollapsedPanelStrip } from "./CollapsedPanelStrip"
import { PanelContainer } from "./PanelContainer"
import { useWorkspace } from "@/hooks/use-workspace"

export function WorkspacePanel() {
  const { activeTab, visiblePanels } = useWorkspace()

  if (!activeTab || !visiblePanels.child) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select an item from the sidebar to get started
      </div>
    )
  }

  const { parent, child } = visiblePanels
  const childIndex = activeTab.panels.findIndex((p) => p.id === child.id) + 1
  const parentIndex = parent ? activeTab.panels.findIndex((p) => p.id === parent.id) + 1 : 0

  if (!parent) {
    return (
      <div className="h-full flex">
        <PanelContainer panel={child} index={childIndex} className="flex-1" />
      </div>
    )
  }

  return (
    <div className="h-full flex">
      <CollapsedPanelStrip />
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        <ResizablePanel defaultSize={25}>
          <PanelContainer panel={parent} index={parentIndex} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <PanelContainer panel={child} index={childIndex} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
