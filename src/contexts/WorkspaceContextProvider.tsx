import type { WorkspaceState, PanelType, Panel, Tab, TabId, PanelId } from "@/types/workspace"
import { useState, useCallback, useMemo } from "react"
import type { MarketplaceItem, WorkspaceContextValue } from "./WorkspaceContext"
import { WorkspaceContext } from "./WorkspaceContext"

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

      // Insert new tab after the active tab (VS Code-style)
      let newTabs: Tab[]
      if (prev.activeTabId === null) {
        newTabs = [...prev.tabs, newTab]
      } else {
        const activeIndex = prev.tabs.findIndex((t) => t.id === prev.activeTabId)
        if (activeIndex === -1) {
          newTabs = [...prev.tabs, newTab]
        } else {
          newTabs = [
            ...prev.tabs.slice(0, activeIndex + 1),
            newTab,
            ...prev.tabs.slice(activeIndex + 1),
          ]
        }
      }

      return {
        tabs: newTabs,
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