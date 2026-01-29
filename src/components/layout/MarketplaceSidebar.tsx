import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Search } from "lucide-react"

export interface MarketplaceItem {
  id: string
  name: string
  category: string
  license: string
  size: string
}

interface MarketplaceSidebarProps {
  type: "dataset" | "model" | "engine"
  onItemSelect: (item: MarketplaceItem) => void
  selectedItemId?: string
}

const categories = ["All", "Popular", "Recent", "Featured", "Trending", "Official", "Community", "Verified"]
const licenses = ["All", "MIT", "Apache 2.0", "GPL", "BSD", "Commercial"]
const sizes = ["All", "Small", "Medium", "Large", "XL"]

function generateMockItems(type: string, count: number): MarketplaceItem[] {
  const prefixes: Record<string, string[]> = {
    dataset: ["ImageNet", "COCO", "WikiText", "Common Crawl", "OpenImages", "MNIST", "CIFAR", "SQuAD", "GLUE", "LibriSpeech"],
    model: ["GPT", "BERT", "LLaMA", "Mistral", "Claude", "Gemini", "Stable Diffusion", "YOLO", "ResNet", "ViT"],
    engine: ["TensorRT", "ONNX", "vLLM", "Triton", "Ray", "DeepSpeed", "Megatron", "JAX", "PyTorch", "TensorFlow"],
  }
  
  const names = prefixes[type] || prefixes.dataset
  return Array.from({ length: count }, (_, i) => ({
    id: `${type}-${i}`,
    name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}.0`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
    license: licenses[Math.floor(Math.random() * (licenses.length - 1)) + 1],
    size: sizes[Math.floor(Math.random() * (sizes.length - 1)) + 1],
  }))
}

const actionLabels: Record<string, string> = {
  dataset: "Add",
  model: "Install",
  engine: "Browse",
}

export function MarketplaceSidebar({ type, onItemSelect, selectedItemId }: MarketplaceSidebarProps) {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [licenseFilter, setLicenseFilter] = useState("All")
  const [sizeFilter, setSizeFilter] = useState("All")
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [displayCount, setDisplayCount] = useState(20)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const allItems = useRef<MarketplaceItem[]>([])

  useEffect(() => {
    allItems.current = generateMockItems(type, 100)
    setItems(allItems.current)
    setDisplayCount(20)
  }, [type])

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
    const matchesLicense = licenseFilter === "All" || item.license === licenseFilter
    const matchesSize = sizeFilter === "All" || item.size === sizeFilter
    return matchesSearch && matchesCategory && matchesLicense && matchesSize
  })

  const displayedItems = filteredItems.slice(0, displayCount)
  const hasMore = displayCount < filteredItems.length

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayCount((prev) => Math.min(prev + 20, filteredItems.length))
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, filteredItems.length])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="shrink-0 p-3 space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-wide">
          {type.charAt(0).toUpperCase() + type.slice(1)} Market
        </h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">License</Label>
          <Select value={licenseFilter} onValueChange={setLicenseFilter}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="License" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              {licenses.map((lic) => (
                <SelectItem key={lic} value={lic}>
                  {lic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Size</Label>
          <Select value={sizeFilter} onValueChange={setSizeFilter}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              {sizes.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator />

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2 space-y-1">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedItemId === item.id ? "bg-muted" : ""
              }`}
              onClick={() => onItemSelect(item)}
            >
              <span className="text-sm truncate flex-1 mr-2">{item.name}</span>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {actionLabels[type]}
              </Button>
            </div>
          ))}
          <div ref={sentinelRef} className="h-4">
            {hasMore && (
              <div className="text-center text-xs text-muted-foreground py-2">
                Loading more...
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
