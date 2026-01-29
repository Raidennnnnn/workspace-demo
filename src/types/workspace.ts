export type PanelType = "dataset" | "model" | "engine"
export type PanelId = string
export type TabId = string

export interface Panel {
  id: PanelId
  type: PanelType
  itemId: string
  itemName: string
  parentId: PanelId | null
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
