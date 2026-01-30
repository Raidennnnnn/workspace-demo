import { useEffect, useRef } from "react"
import { X, Database, Box, Cog } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useWorkspace } from "@/hooks/use-workspace"
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll"
import type { PanelType, TabId, WorkspaceState } from "@/types/workspace"
import { Button } from "../ui/button"

const typeIcons: Record<PanelType, typeof Database> = {
  dataset: Database,
  model: Box,
  engine: Cog,
}

export function TabBar() {
  const { state, switchTab, closeTab } = useWorkspace()

  if (state.tabs.length === 0) {
    return <></>
  }

  return <TabBarContent state={state} switchTab={switchTab} closeTab={closeTab} />
}

export function TabBarContent({
  state, switchTab, closeTab }:
  { state: WorkspaceState, switchTab: (tabId: TabId) => void, closeTab: (tabId: TabId) => void }
) {
  const scrollRef = useHorizontalScroll<HTMLDivElement>()
  const tabRefs = useRef<Map<TabId, HTMLButtonElement>>(new Map())
  const prevActiveTabIdRef = useRef(state.activeTabId)

  useEffect(() => {
    if (state.activeTabId && state.activeTabId !== prevActiveTabIdRef.current) {
      const tabElement = tabRefs.current.get(state.activeTabId)
      if (tabElement) {
        tabElement.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" })
      }
    }
    prevActiveTabIdRef.current = state.activeTabId
  }, [state.activeTabId])

  return (
    <div className="border-b bg-muted/20 shrink-0">
      <Tabs
        value={state.activeTabId || undefined}
        onValueChange={switchTab}
        className="w-full"
      >
        <ScrollArea ref={scrollRef} className="w-full">
          <TabsList variant="line" className="h-9 w-max bg-transparent p-0">
            {state.tabs.map((tab) => {
              const Icon = typeIcons[tab.type]
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  ref={(el) => {
                    if (el) tabRefs.current.set(tab.id, el)
                    else tabRefs.current.delete(tab.id)
                  }}
                  className="relative h-9 gap-1.5 rounded-none border-r border-r-border px-3 data-[state=active]:bg-background"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="truncate max-w-32">{tab.title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 p-0.5 rounded hover:bg-muted"
                    onClick={() => closeTab(tab.id)}
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </TabsTrigger>
              )
            })}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
    </div>
  )
}
