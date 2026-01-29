import { Button } from "@/components/ui/button"
import type { MarketplaceItem } from "./MarketplaceSidebar"

interface MarketplaceContentProps {
  item: MarketplaceItem
  type: "dataset" | "model" | "engine"
}

const actionLabels: Record<string, string> = {
  dataset: "Add to My Datasets",
  model: "Install Model",
  engine: "Collect Engine",
}

export function MarketplaceContent({ item, type }: MarketplaceContentProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">{item.name}</h1>
      <Button size="lg">
        {actionLabels[type]}
      </Button>
    </div>
  )
}
