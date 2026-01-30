# Horizontal Mouse Wheel Scroll

Enable horizontal scrolling with the mouse wheel for shadcn/ui ScrollArea components.

## Installation

1. Copy `hooks/use-horizontal-scroll.ts` to your project
2. Replace your `components/ui/scroll-area.tsx` with the provided file

## Usage

```typescript
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll"

function MyComponent() {
  const scrollRef = useHorizontalScroll<HTMLDivElement>()

  return (
    <ScrollArea ref={scrollRef} className="w-full whitespace-nowrap">
      <div className="flex gap-4 p-4">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

## What Changed

### scroll-area.tsx
- Added `React.forwardRef` to forward refs to the Viewport element
- Added `displayName` property

### useHorizontalScroll hook
- Listens for vertical wheel events (deltaY)
- Converts them to horizontal scrolling (scrollLeft)
- Preserves natural trackpad horizontal gestures

## Features

- Mouse wheel scrolls horizontally
- Trackpad gestures still work normally
- No changes to vertical scroll areas
- TypeScript support

## Requirements

- React 18+
- shadcn/ui ScrollArea
- Radix UI

That's it!
