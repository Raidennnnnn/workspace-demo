# State Management

## Overview

State is managed via React Context API with custom hooks. No external state library (Redux/Zustand) is used.

## Workspace Context

**Files**: `src/contexts/WorkspaceContext.tsx`, `src/contexts/WorkspaceContextProvider.tsx`

### Context Interface

```typescript
interface WorkspaceContextValue {
  state: WorkspaceState              // Current state
  openTab: (type, item, source) => void
  closeTab: (tabId) => void
  switchTab: (tabId) => void
  openChildPanel: (type, item) => void
  closePanel: (panelId) => void
  expandPanel: (panelId) => void
  activeTab: Tab | null
  visiblePanels: { parent, child }
  collapsedPanels: Panel[]
}
```

### State Structure

```typescript
interface WorkspaceState {
  tabs: Tab[]
  activeTabId: TabId | null
}

interface Tab {
  id: TabId
  title: string
  type: PanelType
  panels: Panel[]           // Parent-child chain
  activePanelId: PanelId
}

interface Panel {
  id: PanelId
  type: PanelType           // "dataset" | "model" | "engine" | "settings"
  itemId: string
  itemName: string
  parentId: PanelId | null
  source: PanelSource       // "my" | "marketplace"
}
```

### Type Definitions

```typescript
type PanelType = "dataset" | "model" | "engine" | "settings"
type PanelSource = "my" | "marketplace"
type PanelId = string
type TabId = string
```

## Tab Management Logic

- New tabs inserted **after active tab** (VS Code style)
- Closing tab activates previous/next sibling
- Tab title comes from marketplace item name
- ID generation: Random 7-char alphanumeric

## Panel Hierarchy Logic

- One parent → multiple children (but only last child shown fully)
- Parent-child relationship via `parentId`
- Closing parent closes all descendants
- Max 4 levels deep

## Visible Panels Calculation

```typescript
const visiblePanels = useMemo(() => {
  const activeIndex = panels.findIndex(p => p.id === activePanelId)
  return {
    parent: panels[activeIndex - 1],  // undefined if activeIndex <= 0
    child: panels[activeIndex]
  }
}, [activeTab])
```

## Theme Context

**File**: `src/components/theme-provider.tsx`

```typescript
interface ThemeProviderState {
  mode: "dark" | "light" | "system"
  colorTheme: "default" | "purple" | "green" | "blue" | "yellow" | "pink"
  setMode: (mode) => void
  setColorTheme: (theme) => void
}
```

**System detection**:
```typescript
window.matchMedia("(prefers-color-scheme: dark)").matches
```

## Custom Hooks

### `useWorkspace()`
```typescript
export function useWorkspace(): WorkspaceContextValue
```
- Access workspace state and actions
- Throws if used outside WorkspaceProvider

### `useTheme()`
```typescript
export function useTheme(): ThemeProviderState
```
- Access and modify theme
- Throws if used outside ThemeProvider

### `useHorizontalScroll<T>()`
```typescript
export function useHorizontalScroll<T extends HTMLElement>(): React.Ref<T>
```
- Enable vertical mousewheel to trigger horizontal scroll
- Used in TabBar for tab overflow scrolling

## Performance Optimizations

### Memoization

```typescript
const activeTab = useMemo(() => {
  return state.tabs.find((t) => t.id === state.activeTabId) ?? null
}, [state.tabs, state.activeTabId])

const visiblePanels = useMemo(() => {
  // Complex computation cached
}, [activeTab])
```

### Callback Optimization

All state setters wrapped in `useCallback`:
```typescript
const openTab = useCallback((type, item, source) => {
  setState(...)
}, [])
```

### Immutable Updates

```typescript
setState((prev) => ({
  ...prev,
  tabs: prev.tabs.map(t =>
    t.id === activeTab.id ? { ...t, ...updates } : t
  )
}))
```
