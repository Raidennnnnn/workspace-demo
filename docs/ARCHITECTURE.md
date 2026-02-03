# Architecture Overview

> VS Code-inspired IDE-like web application

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 19.2 |
| Language | TypeScript | 5.9 (strict) |
| Build | Vite | 7.2 |
| CSS | Tailwind CSS | 4.1 |
| UI Components | shadcn/ui (Radix UI) | - |
| Icons | lucide-react | 0.563 |
| State | Context API + hooks | - |
| Panels | react-resizable-panels | 4.5 |
| Notifications | sonner | 2.0 |
| PWA | vite-plugin-pwa | - |

## Directory Structure

```
src/
├── App.tsx                    # Root component with theme and layout
├── main.tsx                   # React entry point
├── index.css                  # Global styles
├── components/
│   ├── layout/                # Main layout components
│   │   ├── AppLayout.tsx      # Root layout with resizable panels
│   │   ├── ActivityBar.tsx    # Left vertical navigation bar
│   │   ├── Sidebar.tsx        # Dynamic sidebar router
│   │   ├── MySidebar.tsx      # "My" view sidebar
│   │   ├── MarketplaceSidebar.tsx  # Marketplace views sidebar
│   │   ├── MainArea.tsx       # Central content area
│   │   ├── BottomPanel.tsx    # Bottom chat/terminal area
│   │   └── MarketplaceContent.tsx  # Marketplace item display
│   ├── workspace/             # Panel management components
│   │   ├── WorkspacePanel.tsx # Parent-child panel container
│   │   ├── TabBar.tsx         # Tab navigation for panels
│   │   ├── PanelContainer.tsx # Individual panel wrapper
│   │   ├── PanelContent.tsx   # Panel content display
│   │   ├── CollapsedPanelStrip.tsx    # Collapsed panel indicators
│   │   └── CollapsedPanelIndicator.tsx
│   ├── ui/                    # shadcn/ui components
│   └── theme-provider.tsx     # Custom theme provider
├── contexts/
│   ├── WorkspaceContext.tsx   # Context interface definition
│   └── WorkspaceContextProvider.tsx  # Context provider with state logic
├── hooks/
│   ├── use-workspace.ts       # Workspace context hook
│   ├── use-theme.ts           # Theme context hook
│   └── use-horizontal-scroll.ts  # Mouse wheel horizontal scroll
├── lib/
│   └── utils.ts               # cn() utility (clsx + tailwind-merge)
└── types/
    └── workspace.ts           # TypeScript interfaces
```

## Layout Hierarchy

```
App (Root)
└── ThemeProvider
    └── WorkspaceProvider
        └── AppLayout
            ├── ActivityBar (48px fixed width)
            │   └── Theme/Color switcher dropdown
            ├── Sidebar (20% default, resizable)
            │   ├── MySidebar (if "my" view)
            │   ├── MarketplaceSidebar (if "dataset"/"model"/"engine")
            │   └── Generic sidebar (if "message"/"userinfo")
            ├── MainArea (remaining width)
            │   ├── TabBar
            │   └── WorkspacePanel
            │       ├── CollapsedPanelStrip
            │       ├── PanelContainer (parent, 25%)
            │       └── PanelContainer (child, 75%)
            └── BottomPanel (30% height, collapsible)
```

## Resizable Panel System

Uses **react-resizable-panels** library:

- **Horizontal**: ActivityBar | Sidebar | MainArea
- **Vertical**: MainArea | BottomPanel
- **Nested**: Parent (25%) | Child (75%) within WorkspacePanel

## Navigation Flow

```
ActivityBar click
  ↓
handleViewChange(view)
  ↓
setActiveView(view)  [toggle if already active]
  ↓
Sidebar re-renders based on activeView
  ↓
User clicks item in sidebar
  ↓
openTab(type, item, source)
  ↓
New tab created, added to tabs array
  ↓
Active panel shown in MainArea
```

## Tab Navigation (VS Code Style)

- **Tab insertion**: After currently active tab
- **Tab switching**: Click tab or keyboard
- **Tab closing**: Via close button
- **Tab overflow**: Horizontal scroll in TabBar

## Panel Navigation

- **Ancestor panels**: Shown as numbered boxes in CollapsedPanelStrip
- **Click to expand**: Brings ancestor back into view
- **Max depth**: 4 levels (0-3 children)

## Theme System

**Document class manipulation**:
```
.light / .dark                 (Mode)
.theme-default / .theme-purple / ...  (Color)
```

**6 color themes** using OKLch color space:
- default, purple, green, blue, yellow, pink

**Storage**: localStorage with configurable key prefix
