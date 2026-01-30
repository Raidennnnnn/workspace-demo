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

  if (!parent) {
    return (
      <div className="h-full flex">
        <PanelContainer panel={child} className="flex-1" />
      </div>
    )
  }

  return (
    <div className="h-full flex">
      <CollapsedPanelStrip />
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        <ResizablePanel defaultSize={25}>
          <PanelContainer panel={parent} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <PanelContainer panel={child} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
