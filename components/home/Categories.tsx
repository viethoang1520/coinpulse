import Image from "next/image"
import DataTable from "../DataTable"
import { TrendingDown, TrendingUp } from "lucide-react"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { fetcher } from "@/lib/coingecko.actions"
import { CategoriesFallback } from "./fallback"

const Categories = async () => {
  let categories
  try {
    categories = await fetcher<Category[]>('coins/categories')
  } catch (error) {
    console.error('Failed to fetch categories', error)
    return <CategoriesFallback />
  }

  const columns: DataTableColumn<Category>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: (category) => category.name
    },
    {
      header: "Top Gainers",
      cellClassName: 'top-gainers-cell',
      cell: (cat) => {
        const images = cat.top_3_coins
        return (
          <div className="flex gap-2">
            {images.map((image) => {
              return (
                <Image src={image} alt={image} key={image} width={28} height={28} />
              )
            })}
          </div>
        )
      }
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: (cat) => {
        const changePercentage = cat.market_cap_change_24h
        const isTrendingUp = changePercentage > 0
        return (
          <div className={cn('change-cell',
            isTrendingUp ? 'text-green-500' : 'text-red-500'
          )}>
            <p>{formatPercentage(changePercentage)}</p>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </div>
        )
      }
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (cat) => {
        const marketCap = formatCurrency(cat.market_cap)
        return (
          <p className="text-white-500">{marketCap}</p>
        )
      }
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (cat) => {
        const volume = formatCurrency(cat.volume_24h)
        return (
          <p className="text-white-500">{volume}</p>
        )
      }
    }
  ]

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={columns}
        data={categories?.slice(0, 10) || []}
        rowKey={(_, rowIndex) => rowIndex}
        tableClassName="mt-3"
      />
    </div>
  )
}

export default Categories