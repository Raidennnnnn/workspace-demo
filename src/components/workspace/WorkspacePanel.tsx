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
        <p className="flex flex-col gap-2 mt-4 text-foreground">
          <span className="font-bold">优势：</span>
          <span>1. 布局参考 VS Code，扎实稳定</span>
          <span>2. VS Code 是最流行的代码编辑器，此布局是很好的参考</span>
          <span>3. 用户会感觉像在真实工作区，而非普通网页应用</span>
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
