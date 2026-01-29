import { TabBar, WorkspacePanel } from "@/components/workspace"

export function MainArea() {
  return (
    <div className="flex-1 h-full bg-background flex flex-col overflow-hidden">
      <TabBar />
      <div className="flex-1 min-h-0">
        <WorkspacePanel />
      </div>
    </div>
  )
}
