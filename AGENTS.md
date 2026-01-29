# AGENTS.md

> **Progress tracking:** See [PROGRESS.md](./PROGRESS.md) for implementation status

## Commands
- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (runs tsc + vite build)
- **Lint:** `pnpm lint`
- **Type check:** `pnpm tsc -b`
- **Add shadcn component:** `pnpm dlx shadcn@latest add <component>`

## Architecture
- React 19 + TypeScript + Vite 7 SPA (VS Code-like layout)
- Tailwind CSS v4 + shadcn/ui (radix-vega style, lucide icons)
- Entry: `src/main.tsx` → `src/App.tsx`
- Path aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`
- Layout structure:
  - Activity Bar (left edge): vertical icon buttons, clicking toggles corresponding sidebar view
  - Sidebar: resizable, toggleable via activity bar icons
  - Main Area: split panels with parent-child hierarchy
    - One parent → one child (unlimited descendants depth)
    - Closing parent closes all descendants
    - Only two panels shown fully: parent (1/4 left), child (3/4 right), resizable, default is last two.
    - Ancestor panels collapse to small rectangles in order; click to expand/swap
  - Bottom Panel: closeable, lives within main area, resizable with the area

## Code Style
- Use functional React components with named exports
- Use shadcn/ui components from `@/components/ui`; utils from `@/lib/utils`
- Tailwind utility classes; CSS variables for theming
- TypeScript strict mode; avoid `any` types
- ESLint with react-hooks and react-refresh plugins
- Prefer `export function` over `export default` for components
