"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Category } from "@/types/category.types"
import { Field } from "../ui/field"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const MAX_PRICE = 500

const TutorSidebar = ({
  categories,
  currentFilters,
}: {
  categories: Category[]
  currentFilters: Record<string, string | undefined>
}) => {

  const { replace } = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    currentFilters.category ? [currentFilters.category] : []
  )

  const [minPriceInput, setMinPriceInput] = useState(
    currentFilters.minPrice ? Number(currentFilters.minPrice) : 0
  )
  const [maxPriceInput, setMaxPriceInput] = useState(
    currentFilters.maxPrice ? Number(currentFilters.maxPrice) : MAX_PRICE
  )
  const [minPrice, setMinPrice] = useState(minPriceInput)
  const [maxPrice, setMaxPrice] = useState(maxPriceInput)

  const [rating, setRating] = useState(currentFilters.minRating ? Number(currentFilters.minRating) : 0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinPrice(minPriceInput)
      setMaxPrice(maxPriceInput)
    }, 300)
    return () => clearTimeout(timer)
  }, [minPriceInput, maxPriceInput])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategory) {
      const selectedCategories = Array.isArray(selectedCategory) ? selectedCategory : [selectedCategory]
      params.delete("category")
      selectedCategories.forEach((cat) => (
        params.append("category", cat)
      ))
    }
    else params.delete("category")

    if (minPrice > 0) params.set("minPrice", String(minPrice))
    else params.delete("minPrice")

    if (maxPrice < MAX_PRICE) params.set("maxPrice", String(maxPrice))
    else params.delete("maxPrice")

    if (rating > 0) params.set("minRating", String(rating))
    else params.delete("minRating")

    replace(`${pathName}?${params.toString()}`, { scroll: false })

  }, [selectedCategory, minPrice, maxPrice, rating])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory((prev) => (
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    ))
  }

  const handleRatingChange = (rating: number) => {
    setRating(rating)
  }

  const handleClearFilter = () => {
    setSelectedCategory([])
    setMinPrice(0)
    setMaxPrice(MAX_PRICE)
    setRating(0)

    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("minPrice")
    params.delete("maxPrice")
    params.delete("minRating")

    replace(`${pathName}?${params.toString()}`)
  }

  const hasActiveFilters = selectedCategory.length > 0 || minPrice > 0 || maxPrice < MAX_PRICE || rating > 0;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6 space-y-6">

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <Field key={category.id} orientation="horizontal">
                <Checkbox
                  id={category.id}
                  name={category.name}
                  checked={selectedCategory.includes(category.name)}
                  onCheckedChange={() => handleCategoryChange(category.name)}
                />
                <Label htmlFor={category.id}>{category.name}</Label>
              </Field>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max={MAX_PRICE}
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(Number(e.target.value))}
                className="w-1/2 px-2 py-1 border rounded"
                placeholder="Min"
              />
              <input
                type="number"
                min="0"
                max={MAX_PRICE}
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(Number(e.target.value))}
                className="w-1/2 px-2 py-1 border rounded"
                placeholder="Max"
              />
            </div>
            <p className="text-sm text-gray-600">
              ${minPrice} — ${maxPrice}
            </p>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
          <div className="space-y-3">
            <RadioGroup value={String(rating)} onValueChange={(val) => handleRatingChange(Number(val))} className="w-fit">
              {[1, 2, 3, 4, 5].map((rat) => (
                <div className="flex items-center gap-3" key={rat}>
                  <RadioGroupItem value={String(rat)} id={`r_${rat}`} />
                  <Label htmlFor={`r_${rat}`}>{rat}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilter}
            className="w-full text-center text-xs text-gray-500 hover:text-gray-700 py-2 border-t pt-4 cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  )
}

export default TutorSidebar