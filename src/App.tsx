import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/layout"

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="workspace-demo-theme">
      <AppLayout />
    </ThemeProvider>
  )
}

export default App
