'use client'
import DataTable from "@/components/DataTable"
import { EventsPageFallback } from "@/components/home/fallback"
import { Input } from "@/components/ui/input"
import { fetcher } from "@/lib/coingecko.actions"
import { cn, formatCurrency, formatPercentage, mapCoinDetailsToTrackingData } from "@/lib/utils"
import { Search, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"

const page = () => {

  const columns: DataTableColumn<CoinTrackingData>[] = [
    {
      header: "Name",
      cell: (coin) => (
        <Link href={coin.url} className="text-white-500 hover:text-green-500" target="_blank" rel="noopener noreferrer">
          {coin.name}
        </Link>
      )
    },
    {
      header: "Symbol",
      cell: (coin) => coin.symbol
    },
    {
      header: "Price",
      cell: (coin) => formatCurrency(coin.current_price * (coin.total_token || 1))
    },
    {
      header: "Event Token",
      cell: (coin) => coin.total_token
    },
    {
      header: "Market Cap",
      cellClassName: "font-medium",
      cell: (coin) => {
        const marketCap = formatCurrency(coin.market_cap)
        return (
          <p className="text-white-500">{marketCap}</p>
        )
      }
    },
    {
      header: "Total Supply",
      cell: (coin) => coin.total_supply ? coin.total_supply.toLocaleString() : 'N/A'
    },
    {
      header: "Circulating Supply",
      cell: (coin) => coin.circulating_supply ? coin.circulating_supply.toLocaleString() : 'N/A'
    }
  ]
  const [isPending, startTransition] = useTransition()
  const [searchResult, setSearchResult] = useState([] as SearchCoinResult[])
  const [data, setData] = useState<CoinTrackingData | null>(null)
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const query = e.target.value
      if (!query.trim()) {
        setSearchResult([])
        return
      }
      startTransition(async () => {
        const data: any = await fetcher('search', {
          query: e.target.value
        })
        const filteredCoin = data?.coins?.filter((coin: SearchCoinResult) => coin.symbol.toLowerCase() === query.toLowerCase())
        setSearchResult(filteredCoin)
      })
    } catch (error) {
      console.error('Failed to fetch coins', error)
      return <EventsPageFallback />
    }
  }

  const fetchCoinsData = async (id: string) => {
    try {
      const coinData: CoinDetailsData = await fetcher(`coins/${id}`)
      const mappedData = mapCoinDetailsToTrackingData(coinData)
      setData((prev) => ({...prev, ...mappedData}))
      setSearchResult([])
    } catch (error) {
      console.error('Failed to fetch coin data', error)
      return <EventsPageFallback />
    }

  }
  return (
    <>
      <div className="main-container ">
        <h1 className="text-xl font-medium">Price tracking</h1>
        <div className="flex-center max-w-[80%] gap-2">
          <label className="min-w-25 ">Search coins:</label>
          <div className="relative w-full min-h-full">
            <Input
              placeholder="Bitcoin..."
              onChange={(e) => handleSearchChange(e)}
            />
            <div className="absolute top-10 z-10 w-full rounded-xl bg-dark-400">
              {searchResult.map((coin) => (
                <div onClick={() => { fetchCoinsData(coin.id) }} key={coin.id} className="h-10 px-5 flex items-center hover:bg-green-500 hover:text-gray-900 hover:cursor-pointer">
                  <p>{coin.name} ({coin.symbol})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data ? [data] : []}
          rowKey={(coin) => coin.id}
          tableClassName="mt-4"
        />
      </div>
    </>
  )
}

export default page