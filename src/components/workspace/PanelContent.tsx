import { Button } from "@/components/ui/button"
import { Database, Box, Cog, Plus } from "lucide-react"
import { useWorkspace } from "@/hooks/use-workspace"
import type { Panel, PanelType } from "@/types/workspace"

interface PanelContentProps {
  panel: Panel
}

const typeIcons = {
  dataset: Database,
  model: Box,
  engine: Cog,
}

const typeLabels = {
  dataset: "Dataset",
  model: "Model",
  engine: "Engine",
}

const childTypes: Record<PanelType, PanelType> = {
  dataset: "model",
  model: "engine",
  engine: "dataset",
}

export function PanelContent({ panel }: PanelContentProps) {
  const { openChildPanel, activeTab } = useWorkspace()
  const Icon = typeIcons[panel.type]
  const childType = childTypes[panel.type]

  const panelCount = activeTab?.panels.length ?? 0
  const canCreateChild = panelCount < 4

  const handleCreateChild = () => {
    const mockItem = {
      id: `${childType}-${Date.now()}`,
      name: `${typeLabels[childType]} ${Math.floor(Math.random() * 100)}`,
    }
    openChildPanel(childType, mockItem)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-8 w-8" />
        <span className="text-lg font-medium">{typeLabels[panel.type]}</span>
      </div>
      <h2 className="text-xl font-semibold">{panel.itemName}</h2>
      <p className="text-sm text-muted-foreground">ID: {panel.itemId}</p>

      {canCreateChild && (
        <Button onClick={handleCreateChild} className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Open {typeLabels[childType]}
        </Button>
      )}

      {!canCreateChild && (
        <p className="text-sm text-muted-foreground mt-4">
          Maximum panel depth reached
        </p>
      )}
    </div>
  )
}
