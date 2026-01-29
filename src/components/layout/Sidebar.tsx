import type { ActivityView } from "./ActivityBar"
import { MarketplaceSidebar, type MarketplaceItem } from "./MarketplaceSidebar"

interface SidebarProps {
  activeView: ActivityView
  onItemSelect?: (item: MarketplaceItem, type: "dataset" | "model" | "engine") => void
  selectedItemId?: string
}

export function Sidebar({ activeView, onItemSelect, selectedItemId }: SidebarProps) {
  if (!activeView) return null

  const marketplaceViews = ["dataset", "model", "engine"] as const
  
  if (marketplaceViews.includes(activeView as typeof marketplaceViews[number])) {
    const type = activeView as "dataset" | "model" | "engine"
    return (
      <div className="h-full overflow-hidden bg-muted/30 border-r">
        <MarketplaceSidebar
          type={type}
          onItemSelect={(item) => onItemSelect?.(item, type)}
          selectedItemId={selectedItemId}
        />
      </div>
    )
  }

  const titles: Record<NonNullable<ActivityView>, string> = {
    my: "My",
    dataset: "Dataset",
    model: "Model",
    engine: "Engine",
    message: "Message",
    userinfo: "User Info",
  }

  return (
    <div className="h-full bg-muted/30 border-r">
      <div className="p-3 border-b">
        <h2 className="text-sm font-medium uppercase tracking-wide">
          {titles[activeView]}
        </h2>
      </div>
      <div className="p-3 text-sm text-muted-foreground">
        {activeView} content goes here
      </div>
    </div>
  )
}
