interface MainAreaProps {
  children?: React.ReactNode
}

export function MainArea({ children }: MainAreaProps) {
  return (
    <div className="flex-1 h-full bg-background flex items-center justify-center">
      {children || (
        <div className="text-muted-foreground text-sm">
          Main content area - split panels coming soon
        </div>
      )}
    </div>
  )
}
