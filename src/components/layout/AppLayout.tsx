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
import { MarketplaceContent } from "./MarketplaceContent"
import type { MarketplaceItem } from "./MarketplaceSidebar"

interface SelectedItem {
  item: MarketplaceItem
  type: "dataset" | "model" | "engine"
}

export function AppLayout() {
  const [activeView, setActiveView] = useState<ActivityView>("my")
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)

  const handleItemSelect = (item: MarketplaceItem, type: "dataset" | "model" | "engine") => {
    setSelectedItem({ item, type })
  }

  const handleViewChange = (view: ActivityView) => {
    setActiveView(view)
    if (view !== selectedItem?.type) {
      setSelectedItem(null)
    }
  }

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
      <ActivityBar activeView={activeView} onViewChange={handleViewChange} />
      
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        {activeView && (
          <>
            <ResizablePanel defaultSize={20}>
              <Sidebar
                activeView={activeView}
                onItemSelect={handleItemSelect}
                selectedItemId={selectedItem?.item.id}
              />
            </ResizablePanel>
            <ResizableHandle withHandle/>
          </>
        )}
        
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={70}>
              <MainArea>
                {selectedItem && (
                  <MarketplaceContent
                    item={selectedItem.item}
                    type={selectedItem.type}
                  />
                )}
              </MainArea>
            </ResizablePanel>

            <ResizableHandle className="w-full"/>
            
            <ResizablePanel defaultSize={30}>
              <BottomPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
