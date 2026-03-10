"use client"

import Dropdown from "@/components/dropdown/Dropdown"

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type FilterOptions = {
  sort: string
  filter: string
}

type Props = {
  options: FilterOptions
  onSortChange: (value: string) => void
  onFilterChange: (value: string) => void
}


/*
|--------------------------------------------------------------------------
| OPTIONS
|--------------------------------------------------------------------------
| Jeg definerer valgmulighederne udenfor komponenten så de ikke
| genskabes hver gang komponenten re-renderer.
|
*/

const sortOptions = [
  { value: "price-low", label: "Price Low → High" },
  { value: "price-high", label: "Price High → Low" },
  { value: "name", label: "Name" },
]

const filterOptions = [
  { value: "all", label: "All Flavors" },
  { value: "lemon", label: "Lemon" },
  { value: "berry", label: "Berry" },
  { value: "mint", label: "Mint" },
  { value: "mango", label: "Mango" },
  { value: "passion", label: "Passionfruit" },
  { value: "peach", label: "Peach" },
  { value: "watermelon", label: "Watermelon" },
]

export default function FilterBar(props: Props) {

  return (

    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-10">

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="text-body text-brand-textMuted font-semibold">Sort by:</span>
        <Dropdown
          options={sortOptions}
          value={props.options.sort}
          onChange={props.onSortChange}
        />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-body text-brand-textMuted font-semibold">Filter:</span>
        <Dropdown
          options={filterOptions}
          value={props.options.filter}
          onChange={props.onFilterChange}
        />
      </div>

    </div>
  )
}