import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Database, Cog, Box } from "lucide-react"
import { useWorkspace } from "@/hooks/use-workspace"
import type { PanelType } from "@/types/workspace"

const myItems = [
  { id: "dataset", type: "dataset" as PanelType, icon: Database, title: "Dataset", description: "Manage your datasets" },
  { id: "engine", type: "engine" as PanelType, icon: Cog, title: "Engine", description: "Configure engines" },
  { id: "model", type: "model" as PanelType, icon: Box, title: "Model", description: "Your trained models" },
]

export function MySidebar() {
  const { openTab } = useWorkspace()

  const handleItemClick = (item: typeof myItems[0]) => {
    openTab(item.type, { id: `my-${item.id}`, name: `My ${item.title}` }, "my")
  }

  return (
    <div className="h-full bg-muted/30 border-r">
      <div className="p-3">
        <h2 className="text-sm font-medium uppercase tracking-wide">My</h2>
      </div>
      <Separator />
      <div className="p-3 space-y-2">
        {myItems.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer transition-colors hover:bg-accent py-2"
            onClick={() => handleItemClick(item)}
          >
            <CardHeader className="p-3">
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle className="text-sm">{item.title}</CardTitle>
                  <CardDescription className="text-xs">{item.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Separator />
      <div className="p-3 text-sm">
        <p className=" flex flex-col gap-2 text-foreground">
          <span className="font-bold">优势：</span>
          <span>1. 用户可点击活动栏图标切换显示，类似 VS Code，最大化可用视口</span>
        </p>
      </div>
    </div>
  )
}
