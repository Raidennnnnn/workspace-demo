# Design Patterns

## Component Patterns

### 1. Context Provider Pattern

```tsx
// WorkspaceProvider wraps AppLayout
<WorkspaceProvider>
  <AppLayout />
</WorkspaceProvider>

// Consumed via hook
const { openTab, closeTab } = useWorkspace()
```

### 2. Compound Components (shadcn/ui style)

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Label</DropdownMenuLabel>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

```tsx
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={25}>Content</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={75}>Content</ResizablePanel>
</ResizablePanelGroup>
```

```tsx
<Tabs value={activeId} onValueChange={switchTab}>
  <TabsList>
    <TabsTrigger value={id}>Title</TabsTrigger>
  </TabsList>
</Tabs>
```

### 3. Render Props / Slot Pattern

- **PanelContent**: Takes panel prop and renders different content
- **Sidebar**: Routes to different sidebar components based on props
- **ActivityBar**: Maps over item arrays to render buttons

### 4. Observer Pattern

IntersectionObserver for infinite scroll:
```tsx
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && hasMore) {
    setDisplayCount(prev => Math.min(prev + 20, total))
  }
})
```

### 5. Higher-Order Hook Pattern

```typescript
export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
```

### 6. State Machine-like Pattern

Tab/Panel lifecycle:
```
Empty → OpenTab → Active → ChildPanel → Collapsed → Expanded → Closed
```

## UI Component Patterns

### shadcn/ui Pattern

All UI components follow:
- **Radix UI primitives** for accessibility
- **Tailwind CSS** for styling
- **CVA (Class Variance Authority)** for variants
- **React 19 compatibility**

### Icon Integration

**Library**: lucide-react
```tsx
import { Database, Box, Cog } from "lucide-react"
<Database className="h-4 w-4" />
```

## File Organization Patterns

### Barrel Exports

```typescript
// src/components/layout/index.ts
export * from './AppLayout'
export * from './ActivityBar'
export * from './Sidebar'
// ...
```

### Path Aliases

```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useWorkspace } from "@/hooks/use-workspace"
```

## Styling Patterns

### Class Name Utility

```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  props.className
)} />
```

### Tailwind + CSS Variables

```css
/* Theme variables */
--background: oklch(0.98 0 0);
--foreground: oklch(0.145 0 0);

/* Component usage */
.bg-background { background-color: var(--background); }
```

## Navigation Patterns

### Client-Side Routing (No Router Library)

- **Activity View State**: Conditional sidebar rendering
- **Tab Management**: Visual tabs with state
- **Panel Breadcrumbs**: Numbered ancestor indicators

### Tab Insertion (VS Code Style)

New tabs inserted after currently active tab, not at end.

## Performance Patterns

### Lazy Loading with IntersectionObserver

```tsx
// Initial: 20 items
// On scroll: +20 items incremental
// Max: 100 items
```

### Auto-scroll on Tab Change

```typescript
useEffect(() => {
  tabRef.current?.scrollIntoView({
    inline: "nearest",
    behavior: "smooth"
  })
}, [isActive])
```

## Accessibility Patterns

### From Radix UI

- Proper focus management
- Keyboard navigation
- ARIA attributes
- Screen reader support

### Custom Implementations

- `sr-only` classes for screen readers
- `title` attributes on icon buttons
- Proper heading hierarchy
