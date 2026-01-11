import { fetcher } from '@/lib/coingecko.actions'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import DataTable from '../DataTable'
import { TrendingCoinsFallback } from './fallback'

const TrendingCoins = async () => {

  let trendingCoins
  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('search/trending',
      undefined, 300)
  } catch (error) {
    console.error('Failed to fetch trending coins:', error)
    return (
      <TrendingCoinsFallback />
    )
  }
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item
        return (
          <div className="flex items-center gap-3">
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <div>
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-sm text-gray-400 uppercase">{item.symbol}</p>
            </div>
          </div>
        )
      }
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const item = coin.item
        const changePercentage = item.data.price_change_percentage_24h.usd
        const isTrendingUp = changePercentage >= 0
        return (
          <div className={cn("flex flex-col items-center gap-1", isTrendingUp ? "text-green-500" : "text-red-500")}>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
            <span>{isTrendingUp ? "+" : ""}{changePercentage.toFixed(2)}%</span>
          </div>
        )
      }
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => {
        const item = coin.item
        return (
          <p className="font-medium text-white">${item.data.price.toLocaleString()}</p>
        )
      }
    },
    {
      header: "Market Cap Rank",
      cellClassName: "rank-cell",
      cell: (coin) => {
        const item = coin.item
        return (
          <p className="text-gray-400">#{item.market_cap_rank}</p>
        )
      }
    }
  ]

  return (
    <div id='trending-coins'>
      <h4 className="text-white text-lg font-medium">Trending Coins</h4>
      <DataTable
        data={trendingCoins.coins.slice(0, 6) || []}
        columns={columns}
        rowKey={(coin, index) => coin.item.id || index}
        tableClassName='trending-coins-table'
        headerCellClassName='py-3!'
        bodyCellClassName='py-y-2'
      />
    </div>
  )
}

export default TrendingCoins