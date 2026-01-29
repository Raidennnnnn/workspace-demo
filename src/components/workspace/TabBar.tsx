import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tab } from "./Tab"
import { useWorkspace } from "@/hooks/use-workspace"

export function TabBar() {
  const { state, switchTab, closeTab } = useWorkspace()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 150
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      })
    }
  }

  if (state.tabs.length === 0) {
    return null
  }

  return (
    <div className="flex items-center border-b bg-muted/20 shrink-0">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-6 shrink-0"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {state.tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            title={tab.title}
            type={tab.type}
            isActive={tab.id === state.activeTabId}
            onSwitch={switchTab}
            onClose={closeTab}
          />
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-6 shrink-0"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
