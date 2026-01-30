import { Terminal, ChevronDown, ChevronUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface BottomPanelProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function BottomPanel({ isCollapsed, onToggle }: BottomPanelProps) {
  return (
    <div className="flex flex-col bg-muted/30 border-t">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Chat Area</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onToggle}
        >
          {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      {!isCollapsed && (
        <>
          <Separator />
          <div className="flex-1 p-3 font-mono text-sm">
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary"> ai chat area, this is command mode</span>
              <span> can be switch to chat mode (not implement in this demo)</span>
              <span> maximum viewport by clicking the arrow on the top-right in the bottom panel</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
