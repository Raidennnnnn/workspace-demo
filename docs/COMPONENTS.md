# Component Reference

## Layout Components

### AppLayout
**File**: `src/components/layout/AppLayout.tsx`

Root layout orchestrator managing the overall application structure.
- Integrates ActivityBar, Sidebar, MainArea, and BottomPanel
- Handles resizable panel groups

### ActivityBar
**File**: `src/components/layout/ActivityBar.tsx`

Left-edge vertical icon navigation (48px fixed width).
- **Top section**: My, Dataset, Model, Engine buttons
- **Bottom section**: Message, User Info, Theme dropdown
- **Features**: Active state indication, theme/color switching

### Sidebar
**File**: `src/components/layout/Sidebar.tsx`

Dynamic sidebar router (20% default width, resizable).
- Routes to MySidebar, MarketplaceSidebar, or generic placeholders
- Based on `activeView` state

### MySidebar
**File**: `src/components/layout/MySidebar.tsx`

"My" view sidebar showing user's Dataset, Engine, Model cards.

### MarketplaceSidebar
**File**: `src/components/layout/MarketplaceSidebar.tsx`

Marketplace filtering and listing.
- **Features**: Infinite scroll (IntersectionObserver), multi-filter (Category, License, Size), search
- **Data**: Mock 100 items per type

### MainArea
**File**: `src/components/layout/MainArea.tsx`

Central content wrapper containing TabBar and WorkspacePanel.

### BottomPanel
**File**: `src/components/layout/BottomPanel.tsx`

Collapsible bottom drawer (30% default height).
- Chat/terminal area placeholder
- Toggle collapse/expand

## Workspace Components

### WorkspacePanel
**File**: `src/components/workspace/WorkspacePanel.tsx`

Parent-child panel layout manager.
- Resizable panels: Parent (25%) + Child (75%)
- Collapsed panels as numbered indicators
- Max depth: 4 levels

### TabBar
**File**: `src/components/workspace/TabBar.tsx`

Tab navigation with horizontal scroll.
- Shows all open tabs with close buttons
- Uses `useHorizontalScroll` for overflow

### PanelContainer
**File**: `src/components/workspace/PanelContainer.tsx`

Individual panel wrapper with header and close button.

### PanelContent
**File**: `src/components/workspace/PanelContent.tsx`

Panel content display logic.
- Different content based on panel type
- "Open Child" button for creating nested panels

### CollapsedPanelStrip
**File**: `src/components/workspace/CollapsedPanelStrip.tsx`

Container for ancestor panel indicators.

### CollapsedPanelIndicator
**File**: `src/components/workspace/CollapsedPanelIndicator.tsx`

Single numbered indicator button for collapsed panels.
- Click to expand/swap into view

## Theme Components

### ThemeProvider
**File**: `src/components/theme-provider.tsx`

Custom theme context provider.
- Mode: dark / light / system
- Color: 6 themes (default, purple, green, blue, yellow, pink)
- localStorage persistence

### ThemeSwitcher
**File**: `src/components/theme-switcher.tsx`

Full theme switcher UI component.

### ModeToggle
**File**: `src/components/mode-toggle.tsx`

Light/dark mode toggle button.

## UI Components (shadcn/ui)

All from `@/components/ui/`:

| Component | Description |
|-----------|-------------|
| button | Button with variants (default, destructive, outline, secondary, ghost, link) |
| card | Card container components |
| dropdown-menu | DropdownMenu compound component |
| input | Text input |
| label | Form label |
| resizable | Wrapper for react-resizable-panels |
| scroll-area | Custom scrollable area |
| select | Select dropdown |
| separator | Visual divider |
| tabs | Tab management |
| tooltip | Hover tooltips |
| sonner | Toast notifications |

## Component Statistics

| Category | Count | ~Lines |
|----------|-------|--------|
| Layout | 8 | 630 |
| Workspace | 6 | 296 |
| Theme | 3 | 193 |
| UI (shadcn) | 12 | ~600 |
| **Total** | **29** | **~1,700** |

## Component Relationships

```
WorkspaceProvider (Context)
├── AppLayout
│   ├── ActivityBar
│   ├── Sidebar
│   │   ├── MySidebar → openTab()
│   │   └── MarketplaceSidebar → openTab()
│   ├── MainArea
│   │   └── WorkspacePanel
│   │       ├── TabBar → switchTab(), closeTab()
│   │       └── PanelContainer → closePanel()
│   │           └── PanelContent → openChildPanel()
│   └── BottomPanel
└── useWorkspace() hook consumers
```
