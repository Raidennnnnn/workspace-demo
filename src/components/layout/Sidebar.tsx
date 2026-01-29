import type { ActivityView } from "./ActivityBar"
import { MarketplaceSidebar } from "./MarketplaceSidebar"
import { MySidebar } from "./MySidebar"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
  activeView: ActivityView
}

export function Sidebar({ activeView }: SidebarProps) {
  if (!activeView) return null

  if (activeView === "my") {
    return <MySidebar />
  }

  const marketplaceViews = ["dataset", "model", "engine"] as const

  if (marketplaceViews.includes(activeView as typeof marketplaceViews[number])) {
    const type = activeView as "dataset" | "model" | "engine"
    return (
      <div className="h-full overflow-hidden bg-muted/30 border-r">
        <MarketplaceSidebar type={type} />
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
      <div className="p-3">
        <h2 className="text-sm font-medium uppercase tracking-wide">
          {titles[activeView]}
        </h2>
      </div>
      <Separator />
      <div className="p-3 text-sm text-muted-foreground">
        {activeView} content goes here
      </div>
    </div>
  )
}
