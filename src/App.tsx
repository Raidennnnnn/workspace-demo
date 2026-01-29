import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/layout"

export function App() {
  return (
    <ThemeProvider defaultMode="dark" storageKey="workspace-demo-theme">
      <AppLayout />
    </ThemeProvider>
  )
}

export default App
