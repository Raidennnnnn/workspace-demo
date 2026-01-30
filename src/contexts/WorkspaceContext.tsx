import { createContext } from "react"
import type { Panel, PanelId, PanelType, Tab, TabId, WorkspaceState } from "@/types/workspace"

export interface MarketplaceItem {
  id: string
  name: string
}

export interface WorkspaceContextValue {
  state: WorkspaceState
  openTab: (type: PanelType, item: MarketplaceItem) => void
  closeTab: (tabId: TabId) => void
  switchTab: (tabId: TabId) => void
  openChildPanel: (type: PanelType, item: MarketplaceItem) => void
  closePanel: (panelId: PanelId) => void
  expandPanel: (panelId: PanelId) => void
  activeTab: Tab | null
  visiblePanels: { parent: Panel | null; child: Panel | null }
  collapsedPanels: Panel[]
}

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)


