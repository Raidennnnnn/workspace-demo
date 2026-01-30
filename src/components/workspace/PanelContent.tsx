import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { useWorkspace } from "@/hooks/use-workspace"
import type { Panel } from "@/types/workspace"

interface PanelContentProps {
  panel: Panel
  index: number
}

const typeLabels = {
  dataset: "Dataset",
  model: "Model",
  engine: "Engine",
  settings: "Settings",
}

export function PanelContent({ panel, index }: PanelContentProps) {
  const { openChildPanel, activeTab } = useWorkspace()

  const panelCount = activeTab?.panels.length ?? 0
  const isSettingsPanel = panel.type === "settings"
  const hasChild = activeTab?.panels.some((p) => p.parentId === panel.id) ?? false
  const canCreateChild = panel.source === "my" && panelCount < 4

  const handleCreateChild = () => {
    const settingsItem = {
      id: `settings-${panel.itemId}-${Date.now()}`,
      name: `Settings for ${panel.itemName}`,
    }
    openChildPanel("settings", settingsItem)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted text-xl font-semibold">
          {index}
        </span>
        {!isSettingsPanel && (
          <span className="text-lg font-medium">{typeLabels[panel.type]}</span>
        )}
      </div>
      <h2 className="text-xl font-semibold">{panel.itemName}</h2>
      {!isSettingsPanel && (
        <p className="text-sm text-muted-foreground">ID: {panel.itemId}</p>
      )}

      {canCreateChild && (
        <>
        <p className=" flex flex-col gap-2 text-sm mt-4">
          <span className="font-bold">Advantage:</span>
          <span>1. all the detail or setting will render in the panel, not a dialog/drawer, this feels more stable and user friendly</span>
          <span>2. this approach will mostly avoid dialog on top of dialog/ drawer on top of drawer, which is very annoying</span>
        </p>
        <Button onClick={handleCreateChild} className="mt-4" disabled={hasChild}>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        </>
      )}

      {panel.source === "my" && !canCreateChild && (
        <p className="text-sm text-muted-foreground mt-4">
          Maximum panel depth reached
        </p>
      )}
    </div>
  )
}
