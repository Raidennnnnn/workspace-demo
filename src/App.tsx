import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/layout"
import { Toaster } from "@/components/ui/sonner"

export function App() {
  return (
    <ThemeProvider defaultMode="dark" storageKey="workspace-demo-theme">
      <AppLayout />
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default App
