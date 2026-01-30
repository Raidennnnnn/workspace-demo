import * as React from "react"

export function useHorizontalScroll<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleWheel = (event: WheelEvent) => {
      // Only handle vertical wheel events (when user scrolls with mouse wheel)
      // deltaX is for horizontal trackpad gestures, which we want to preserve
      if (event.deltaY !== 0 && event.deltaX === 0) {
        event.preventDefault()
        element.scrollLeft += event.deltaY
      }
    }

    // passive: false is required to allow preventDefault()
    element.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      element.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return ref
}
