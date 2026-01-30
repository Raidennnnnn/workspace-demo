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
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
        Select an item from the sidebar to get started
        <p className="flex flex-col gap-2 mt-4 text-primary">
          <span className="font-bold">Advantage:</span>
          <span>1. this layout is mostly copying VS Code, solid and stable</span>
          <span>2. vscode is a most popular code editor, this layout is a good reference</span>
          <span>3. user will feel like in a real workspace, not like a web app</span>
        </p>
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
