import { useState, useEffect } from "react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { ActivityBar, type ActivityView } from "./ActivityBar"
import { Sidebar } from "./Sidebar"
import { MainArea } from "./MainArea"
import { BottomPanel } from "./BottomPanel"
import { WorkspaceProvider } from "@/contexts/WorkspaceContextProvider"
import { toast } from "sonner"

export function AppLayout() {
  const [activeView, setActiveView] = useState<ActivityView>("my")
  const [isBottomCollapsed, setIsBottomCollapsed] = useState(false)

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    if (!isStandalone) {      
      setTimeout(() => {
        toast.info("安装到桌面，获得最佳体验", {
          duration: 10000,
        })
      })
    }
  }, [])

  const handleViewChange = (view: ActivityView) => {
    setActiveView(view)
  }

  const handleBottomToggle = () => {
    setIsBottomCollapsed(!isBottomCollapsed)
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
            <div className="h-full flex flex-col">
              {isBottomCollapsed ? (
                <>
                  <div className="flex-1">
                    <MainArea />
                  </div>
                  <BottomPanel isCollapsed={isBottomCollapsed} onToggle={handleBottomToggle} />
                </>
              ) : (
                <ResizablePanelGroup orientation="vertical" className="flex-1">
                  <ResizablePanel defaultSize={70}>
                    <MainArea />
                  </ResizablePanel>
                  <ResizableHandle className="w-full"/>
                  <ResizablePanel defaultSize={30}>
                    <BottomPanel isCollapsed={isBottomCollapsed} onToggle={handleBottomToggle} />
                  </ResizablePanel>
                </ResizablePanelGroup>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </WorkspaceProvider>
  )
}
