interface MainAreaProps {
  children?: React.ReactNode
}

export function MainArea({ children }: MainAreaProps) {
  return (
    <div className="flex-1 h-full bg-zinc-950 flex items-center justify-center">
      {children || (
        <div className="text-zinc-500 text-sm">
          Main content area - split panels coming soon
        </div>
      )}
    </div>
  )
}
