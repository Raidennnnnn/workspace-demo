import { X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function BottomPanel({ isOpen, onClose }: BottomPanelProps) {
  if (!isOpen) return null

  return (
    <div className="h-full flex flex-col bg-muted/30 border-t">
      <div className="flex items-center justify-between px-3 py-1 border-b">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <Button variant="ghost" size="icon-xs" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 p-3 font-mono text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-primary">$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}
