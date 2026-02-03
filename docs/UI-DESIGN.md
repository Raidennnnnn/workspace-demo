# UI/UX Design Patterns

> VS Code-inspired IDE-style workspace interface

## Page Layout Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                    FULL-SCREEN SPA (h-screen w-screen)          │
├────┬────────────┬───────────────────────────────────────────────┤
│    │            │  TabBar [Dataset ✕][Model ✕][Engine ✕]       │
│    │            ├───────────────────────────────────────────────┤
│ A  │            │                                               │
│ c  │  Sidebar   │  ┌───────────┬───────────────────────────┐   │
│ t  │   (20%)    │  │  Parent   │      Child Panel          │   │
│ i  │            │  │   25%     │        75%                │   │
│ v  │  - My      │  │           │                           │   │
│ i  │  - Market  │  │ Resizable │     Resizable             │   │
│ t  │            │  │           │                           │   │
│ y  │            │  └───────────┴───────────────────────────┘   │
│    │            │  [1][2][3] ← Collapsed panel strip           │
│ B  │            ├───────────────────────────────────────────────┤
│ a  │            │  Bottom Panel (Chat/Terminal)                │
│ r  │            │  [Terminal] Content               [↑] Toggle │
└────┴────────────┴───────────────────────────────────────────────┘
```

## Core Layout Components

| Component | Width/Height | Purpose |
|-----------|--------------|---------|
| Activity Bar | 48px fixed | Navigation icons, theme toggle |
| Sidebar | 20% default | View-specific content (My/Marketplace) |
| Main Area | Remaining | Tabs + Workspace panels |
| Bottom Panel | 30% default | Chat/terminal (collapsible) |

## Navigation Pattern

### Activity Bar (Left Edge)
```
┌────────────┐
│ [User]     │  ← Top: My, Dataset, Model, Engine
│ [Database] │    Click: Toggle sidebar visibility
│ [Box]      │
│ [Cog]      │
│ [Spacer]   │  ← flex-1 for centering
│ [Message]  │  ← Bottom: Message, UserInfo
│ [UserInfo] │
│ [Palette]  │  ← Theme dropdown
└────────────┘
```

**Behavior:**
- Click active icon → Hide sidebar (null view)
- Click inactive icon → Show corresponding sidebar
- Visual: Active = solid bg, Inactive = ghost/transparent

### Sidebar Views

**MySidebar** (when "my" active):
```
┌─────────────────────┐
│ MY                  │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ [📦] Dataset    │ │  ← Card with icon
│ │ Manage datasets │ │    hover: bg-accent
│ └─────────────────┘ │    click: openTab()
│ ┌─────────────────┐ │
│ │ [⚙] Engine      │ │
│ │ Configure       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ [📦] Model      │ │
│ │ Trained models  │ │
│ └─────────────────┘ │
└─────────────────────┘
```

**MarketplaceSidebar** (when dataset/model/engine active):
```
┌─────────────────────┐
│ DATASET MARKET      │
├─────────────────────┤
│ [Search...      🔍] │  ← Input
├─────────────────────┤
│ Category [▼]        │  ← Select filters
│ License  [▼]        │
│ Size     [▼]        │
├─────────────────────┤
│ ImageNet 1.0  [Add] │  ← Infinite scroll list
│ COCO 1.0      [Add] │    IntersectionObserver
│ WikiText 1.0  [Add] │    for lazy loading
│ ...                 │
└─────────────────────┘
```

## Panel System

### Hierarchical Parent-Child Model

```
Tab Structure:
├── Tab { id, title, panels[], activePanelId }
└── Panel { id, type, itemId, itemName, parentId, source }

Panel Hierarchy:
Level 0 (Root)    → Collapsed indicator [1]
Level 1 (Parent)  → Visible left (25%)
Level 2 (Child)   → Visible right (75%)
Level 3+          → Collapsed indicators [2][3]...
```

### Visual Layout

```
No parent (single panel):
┌─────────────────────────────────────┐
│              Child Panel            │
│               (100%)                │
└─────────────────────────────────────┘

With parent (split view):
┌──────────┬──────────────────────────┐
│  Parent  │       Child Panel        │
│   25%    │          75%             │
│          │                          │
│ Resizable│        Resizable         │
└──────────┴──────────────────────────┘

With ancestors (4+ panels):
[1][2] ← Collapsed strip (click to expand)
┌──────────┬──────────────────────────┐
│  Parent  │       Child Panel        │
│  (3rd)   │        (4th)             │
└──────────┴──────────────────────────┘
```

### Panel Constraints
- Maximum depth: 4 levels per tab
- Only 2 panels visible at once (parent + child)
- Closing parent closes all descendants
- Click collapsed indicator → Swap into child position

## Tab Navigation (VS Code Style)

```
┌─────────────────────────────────────────────┐
│ [Dataset ✕] [Model ✕] [Engine ✕] ...       │  ← Horizontal scroll
└─────────────────────────────────────────────┘
```

**Behavior:**
- New tabs insert after active tab (not at end)
- Closing active tab → Switch to adjacent tab
- Overflow → Horizontal scroll (useHorizontalScroll hook)
- Active tab: bg-background, Inactive: transparent

## Resizable Panels

Uses `react-resizable-panels`:

```
Horizontal splits:
├── Activity Bar (fixed 48px)
├── Handle ─
├── Sidebar (20% default)
├── Handle ─
└── Main Area (remaining)

Vertical splits (in Main Area):
├── Content Area (70% default)
├── Handle ─
└── Bottom Panel (30% default, collapsible)

Panel splits (in Workspace):
├── Parent Panel (25%)
├── Handle ─
└── Child Panel (75%)
```

## Visual Hierarchy

### Surface Levels
```
Level 1 (Background):
└── bg-background (main content)
    └── bg-muted/30 (sidebar)
    └── bg-muted/20 (tab bar, panel headers)
    └── bg-muted/50 (activity bar)

Level 2 (Interactive):
├── Cards (hover: bg-accent)
├── Buttons (variant-based)
└── Inputs

Level 3 (Overlay):
├── Dropdown menus
├── Select portals
└── Tooltips
```

### Focus States
- Active tab: `data-[state=active]:bg-background`
- Active icon: `variant="default"`
- Hover: `bg-accent` or `bg-muted` transition

## Interaction Patterns

| Element | Click Action | Hover State |
|---------|--------------|-------------|
| Activity Icon | Toggle sidebar | bg-accent |
| Sidebar Card | Open as new tab | bg-accent |
| Marketplace Item | Open as new tab | bg-muted/50 |
| Tab | Switch to tab | — |
| Tab Close (✕) | Close tab | text-foreground |
| Panel Settings | Create child panel | — |
| Collapsed [n] | Expand panel | — |
| Bottom Toggle | Collapse/expand | — |

## Theme System

### Modes
- Light / Dark / System (follows OS preference)

### Color Themes (6 options)
| Theme | OKLCH Value |
|-------|-------------|
| Default | Neutral gray |
| Purple | oklch(0.33 0.16 288) |
| Green | oklch(0.66 0.13 166) |
| Blue | oklch(0.37 0.23 264) |
| Yellow | oklch(0.81 0.16 85) |
| Pink | oklch(0.59 0.23 357) |

### CSS Variables
```css
--background, --foreground
--primary, --secondary, --accent
--muted, --muted-foreground
--border, --ring
```

## Responsive Behavior

- Activity Bar: Always visible (48px)
- Sidebar: Toggleable via activity icons
- Panels: Maintain ratio, shrink proportionally
- Tabs: Text truncates (max-w-32), horizontal scroll
- Bottom Panel: Collapsible to header-only

## Accessibility

- Semantic HTML (`<button>`, proper headings)
- ARIA attributes (via Radix UI primitives)
- Keyboard navigation support
- Focus visible states
- Title attributes on icon buttons
- Screen reader text (`sr-only` classes)

## User Flow Example

```
1. App loads → Dark theme, empty workspace
2. Click [Database] → Sidebar shows MarketplaceSidebar
3. Search "ImageNet" → Filtered list appears
4. Click item → New tab created, panel shows
5. Click [Settings] → Child panel opens (25%/75% split)
6. Click another item → 3rd level, ancestors collapse to [1]
7. Click [1] → Swap panel into view
8. Click tab ✕ → Tab closes, switch to adjacent
9. Click [Database] again → Sidebar hides (toggle off)
10. Click [Palette] → Theme dropdown, select Purple
```
