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
    <div className="h-full bg-zinc-900 border-r border-zinc-800">
      <div className="p-3 border-b border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-200 uppercase tracking-wide">
          {titles[activeView]}
        </h2>
      </div>
      <div className="p-3 text-sm text-zinc-400">
        {activeView} content goes here
      </div>
    </div>
  )
}
