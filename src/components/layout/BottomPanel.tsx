// import { X } from "lucide-react"

// interface BottomPanelProps {
//   isOpen: boolean
//   onClose: () => void
// }

export function BottomPanel() {
  // if (!isOpen) return null

  return (
    <div className="bg-zinc-900 border-t border-zinc-800 h-full">
      <div className="flex items-center justify-between px-3 py-1 border-b border-zinc-800">
        <div className="flex gap-4">
          <button className="text-xs text-zinc-200 hover:text-white">Problems</button>
          <button className="text-xs text-zinc-400 hover:text-white">Output</button>
          <button className="text-xs text-zinc-400 hover:text-white">Terminal</button>
        </div>
        {/* <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button> */}
      </div>
      <div className="p-3 text-sm text-zinc-400 min-h-[100px]">
        Panel content
      </div>
    </div>
  )
}
