import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Database, Cog, Box, Server, ListTodo } from "lucide-react"

const myItems = [
  { id: "dataset", icon: Database, title: "Dataset", description: "Manage your datasets" },
  { id: "engine", icon: Cog, title: "Engine", description: "Configure engines" },
  { id: "model", icon: Box, title: "Model", description: "Your trained models" },
  { id: "resource", icon: Server, title: "Resource", description: "System resources" },
  { id: "task", icon: ListTodo, title: "Task", description: "Running tasks" },
]

export function MySidebar() {
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
    </div>
  )
}
