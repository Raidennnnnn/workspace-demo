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
          <div className="flex-1 p-3 text-sm">
            <div className="flex flex-col items-center gap-2 text-foreground">
              <span className="font-bold">优势：</span>
              <span>1. AI 对话区，此为命令模式</span>
              <span>2. 可切换为聊天模式（本演示未实现）</span>
              <span>3. 点击底部面板右上角箭头可最大化视口</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
