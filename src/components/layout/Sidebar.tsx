import type { ActivityView } from "./ActivityBar"

interface SidebarProps {
  activeView: ActivityView
}

export function Sidebar({ activeView }: SidebarProps) {
  if (!activeView) return null

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
