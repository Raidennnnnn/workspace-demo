export type PanelType = "dataset" | "model" | "engine" | "settings"
export type PanelSource = "my" | "marketplace"
export type PanelId = string
export type TabId = string

export interface Panel {
  id: PanelId
  type: PanelType
  itemId: string
  itemName: string
  parentId: PanelId | null
  source: PanelSource
}

export interface Tab {
  id: TabId
  title: string
  type: PanelType
  panels: Panel[]
  activePanelId: PanelId
}

export interface WorkspaceState {
  tabs: Tab[]
  activeTabId: TabId | null
}
