import { useState } from "react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { ActivityBar, type ActivityView } from "./ActivityBar"
import { Sidebar } from "./Sidebar"
import { MainArea } from "./MainArea"
import { BottomPanel } from "./BottomPanel"
import { WorkspaceProvider } from "@/contexts/WorkspaceContext"

export function AppLayout() {
  const [activeView, setActiveView] = useState<ActivityView>("my")

  const handleViewChange = (view: ActivityView) => {
    setActiveView(view)
  }

  return (
    <WorkspaceProvider>
      <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
        <ActivityBar activeView={activeView} onViewChange={handleViewChange} />

        <ResizablePanelGroup orientation="horizontal" className="flex-1">
          {activeView && (
            <>
              <ResizablePanel defaultSize={20}>
                <Sidebar activeView={activeView} />
              </ResizablePanel>
              <ResizableHandle withHandle/>
            </>
          )}

          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize={70}>
                <MainArea />
              </ResizablePanel>

              <ResizableHandle className="w-full"/>

              <ResizablePanel defaultSize={30}>
                <BottomPanel />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </WorkspaceProvider>
  )
}
