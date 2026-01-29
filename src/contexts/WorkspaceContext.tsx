import { createContext, useCallback, useMemo, useState } from "react"
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

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkspaceState>({
    tabs: [],
    activeTabId: null,
  })

  const openTab = useCallback((type: PanelType, item: MarketplaceItem) => {
    setState((prev) => {
      const existingTab = prev.tabs.find(
        (t) => t.type === type && t.panels[0]?.itemId === item.id
      )
      if (existingTab) {
        return { ...prev, activeTabId: existingTab.id }
      }

      const tabId = generateId()
      const panelId = generateId()
      const newPanel: Panel = {
        id: panelId,
        type,
        itemId: item.id,
        itemName: item.name,
        parentId: null,
      }
      const newTab: Tab = {
        id: tabId,
        title: item.name,
        type,
        panels: [newPanel],
        activePanelId: panelId,
      }
      return {
        tabs: [...prev.tabs, newTab],
        activeTabId: tabId,
      }
    })
  }, [])

  const closeTab = useCallback((tabId: TabId) => {
    setState((prev) => {
      const tabIndex = prev.tabs.findIndex((t) => t.id === tabId)
      if (tabIndex === -1) return prev

      const newTabs = prev.tabs.filter((t) => t.id !== tabId)
      let newActiveTabId = prev.activeTabId

      if (prev.activeTabId === tabId) {
        if (newTabs.length === 0) {
          newActiveTabId = null
        } else if (tabIndex >= newTabs.length) {
          newActiveTabId = newTabs[newTabs.length - 1].id
        } else {
          newActiveTabId = newTabs[tabIndex].id
        }
      }

      return { tabs: newTabs, activeTabId: newActiveTabId }
    })
  }, [])

  const switchTab = useCallback((tabId: TabId) => {
    setState((prev) => ({ ...prev, activeTabId: tabId }))
  }, [])

  const openChildPanel = useCallback((type: PanelType, item: MarketplaceItem) => {
    setState((prev) => {
      const activeTab = prev.tabs.find((t) => t.id === prev.activeTabId)
      if (!activeTab) return prev

      const parentPanel = activeTab.panels.find(
        (p) => p.id === activeTab.activePanelId
      )
      if (!parentPanel) return prev

      const panelId = generateId()
      const newPanel: Panel = {
        id: panelId,
        type,
        itemId: item.id,
        itemName: item.name,
        parentId: parentPanel.id,
      }

      const parentIndex = activeTab.panels.findIndex(
        (p) => p.id === activeTab.activePanelId
      )
      const newPanels = [...activeTab.panels.slice(0, parentIndex + 1), newPanel]

      const updatedTab: Tab = {
        ...activeTab,
        panels: newPanels,
        activePanelId: panelId,
      }

      return {
        ...prev,
        tabs: prev.tabs.map((t) => (t.id === activeTab.id ? updatedTab : t)),
      }
    })
  }, [])

  const closePanel = useCallback((panelId: PanelId) => {
    setState((prev) => {
      const activeTab = prev.tabs.find((t) => t.id === prev.activeTabId)
      if (!activeTab) return prev

      const panelIndex = activeTab.panels.findIndex((p) => p.id === panelId)
      if (panelIndex === -1) return prev

      const newPanels = activeTab.panels.slice(0, panelIndex)

      if (newPanels.length === 0) {
        const newTabs = prev.tabs.filter((t) => t.id !== activeTab.id)
        let newActiveTabId = prev.activeTabId
        if (newTabs.length === 0) {
          newActiveTabId = null
        } else {
          const tabIdx = prev.tabs.findIndex((t) => t.id === activeTab.id)
          if (tabIdx >= newTabs.length) {
            newActiveTabId = newTabs[newTabs.length - 1].id
          } else {
            newActiveTabId = newTabs[tabIdx].id
          }
        }
        return { tabs: newTabs, activeTabId: newActiveTabId }
      }

      const updatedTab: Tab = {
        ...activeTab,
        panels: newPanels,
        activePanelId: newPanels[newPanels.length - 1].id,
      }

      return {
        ...prev,
        tabs: prev.tabs.map((t) => (t.id === activeTab.id ? updatedTab : t)),
      }
    })
  }, [])

  const expandPanel = useCallback((panelId: PanelId) => {
    setState((prev) => {
      const activeTab = prev.tabs.find((t) => t.id === prev.activeTabId)
      if (!activeTab) return prev

      const panelIndex = activeTab.panels.findIndex((p) => p.id === panelId)
      if (panelIndex === -1) return prev

      const childIndex = panelIndex + 1
      if (childIndex >= activeTab.panels.length) {
        return {
          ...prev,
          tabs: prev.tabs.map((t) =>
            t.id === activeTab.id ? { ...t, activePanelId: panelId } : t
          ),
        }
      }

      const childPanel = activeTab.panels[childIndex]
      return {
        ...prev,
        tabs: prev.tabs.map((t) =>
          t.id === activeTab.id ? { ...t, activePanelId: childPanel.id } : t
        ),
      }
    })
  }, [])

  const activeTab = useMemo(() => {
    return state.tabs.find((t) => t.id === state.activeTabId) ?? null
  }, [state.tabs, state.activeTabId])

  const visiblePanels = useMemo(() => {
    if (!activeTab || activeTab.panels.length === 0) {
      return { parent: null, child: null }
    }

    const activeIndex = activeTab.panels.findIndex(
      (p) => p.id === activeTab.activePanelId
    )
    if (activeIndex === -1) {
      return { parent: null, child: null }
    }

    const child = activeTab.panels[activeIndex]
    const parent = activeIndex > 0 ? activeTab.panels[activeIndex - 1] : null

    return { parent, child }
  }, [activeTab])

  const collapsedPanels = useMemo(() => {
    if (!activeTab || activeTab.panels.length <= 2) {
      return []
    }

    const activeIndex = activeTab.panels.findIndex(
      (p) => p.id === activeTab.activePanelId
    )
    if (activeIndex <= 1) {
      return []
    }

    return activeTab.panels.slice(0, activeIndex - 1)
  }, [activeTab])

  const value: WorkspaceContextValue = {
    state,
    openTab,
    closeTab,
    switchTab,
    openChildPanel,
    closePanel,
    expandPanel,
    activeTab,
    visiblePanels,
    collapsedPanels,
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
