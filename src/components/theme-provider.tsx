import { createContext, useEffect, useState } from "react"

export type ColorTheme = "default" | "purple" | "green" | "blue" | "yellow" | "pink"
export type Mode = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultMode?: Mode
  defaultColorTheme?: ColorTheme
  storageKey?: string
}

type ThemeProviderState = {
  mode: Mode
  colorTheme: ColorTheme
  setMode: (mode: Mode) => void
  setColorTheme: (colorTheme: ColorTheme) => void
}

const initialState: ThemeProviderState = {
  mode: "system",
  colorTheme: "default",
  setMode: () => null,
  setColorTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultMode = "system",
  defaultColorTheme = "default",
  storageKey = "workspace-theme",
  ...props
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<Mode>(
    () => (localStorage.getItem(`${storageKey}-mode`) as Mode) || defaultMode
  )
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(
    () => (localStorage.getItem(`${storageKey}-color`) as ColorTheme) || defaultColorTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")
    root.classList.remove("theme-default", "theme-purple", "theme-green", "theme-blue", "theme-yellow", "theme-pink")

    if (colorTheme !== "default") {
      root.classList.add(`theme-${colorTheme}`)
    }

    if (mode === "system") {
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemMode)
      return
    }

    root.classList.add(mode)
  }, [mode, colorTheme])

  const setMode = (mode: Mode) => {
    localStorage.setItem(`${storageKey}-mode`, mode)
    setModeState(mode)
  }

  const setColorTheme = (colorTheme: ColorTheme) => {
    localStorage.setItem(`${storageKey}-color`, colorTheme)
    setColorThemeState(colorTheme)
  }

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{ mode, colorTheme, setMode, setColorTheme }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}
