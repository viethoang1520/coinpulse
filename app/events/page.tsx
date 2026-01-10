'use client'
import DataTable from "@/components/DataTable"
import EditTokenDialog from "@/components/EditTokenDialog"
import { EventsPageFallback } from "@/components/home/fallback"
import { Input } from "@/components/ui/input"
import { fetcher } from "@/lib/coingecko.actions"
import { cn, doesCoinExist, formatCurrency, mapCoinDetailsToTrackingData } from "@/lib/utils"
import { Pencil, Trash, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"

const page = () => {

  const columns: DataTableColumn<CoinTrackingData>[] = [
    {
      header: "Token",
      cell: (coin) => (
        <div className="flex items-center gap-2">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <Link href={coin.url} className="text-white-500 font-medium hover:text-green-500" target="_blank" rel="noopener noreferrer">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Link>
        </div>
      )
    },
    {
      header: "Price",
      cellClassName: "font-medium",
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
          <p className="text-white-500 font-medium">{marketCap}</p>
        )
      }
    },
    {
      header: "Total Supply",
      cellClassName: "font-medium",
      cell: (coin) => coin.total_supply ? coin.total_supply.toLocaleString() : 'N/A'
    },
    {
      header: "Circulating Supply",
      cellClassName: "font-medium",
      cell: (coin) => coin.circulating_supply ? coin.circulating_supply.toLocaleString() : 'N/A'
    },
    {
      header: "Actions",
      cell: (coin) => {
        return (
          <div className="flex items-center gap-3 ">
            <Trash2 onClick={() => handleDelete(coin.id)} className="hover:cursor-pointer" size={18} color="red" />
            <EditTokenDialog
              trigger={<Pencil className="hover:cursor-pointer" size={18} color="#aeadad" />}
              header={`Edit ${coin.name} total token`}
              description="Please type the event token returned"
              input={[{
                label: "Total Token",
              }]}
              onCancel={() => { }}
              onSave={(coin) => handleEdit(coin.id)}
            />
          </div>
        )
      }
    }
  ]
  const [isPending, startTransition] = useTransition()
  const [searchResult, setSearchResult] = useState([] as SearchCoinResult[])
  const [data, setData] = useState<CoinTrackingData[] | []>([])
  useEffect(() => {
    const trackedCoins = localStorage.getItem('trackedCoins')
    if (trackedCoins) {
      setData(JSON.parse(trackedCoins))
    }
  }, [])
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
      if (doesCoinExist(id, data)) {
        console.warn(`Coin with ID "${id}" is already being tracked`)
        setSearchResult([])
        return
      }
      const coinData: CoinDetailsData = await fetcher(`coins/${id}`)
      const mappedData = mapCoinDetailsToTrackingData(coinData)
      setData((prev) => ([...prev, mappedData]))
      localStorage.setItem('trackedCoins', JSON.stringify([...data, mappedData]))
      setSearchResult([])
    } catch (error) {
      console.error('Failed to fetch coin data', error)
      return <EventsPageFallback />
    }
  }
  const handleDelete = (id: string) => {
    const doesCoinExist = data.find((coin) => coin.id === id)
    if (!doesCoinExist) return
    const newData = data.filter((coin) => coin.id != id)
    setData(newData)
    localStorage.setItem("trackedCoins", JSON.stringify(newData))
  }
  const handleEdit = (id: string) => {
    
  }
  return (
    <>
      <div className="main-container ">
        <h1 className="text-xl font-medium">Price tracking</h1>
        <div className="flex-center max-w-[80%] gap-2">
          <label className="min-w-25 ">Search coins:</label>
          <div className="relative w-full min-h-full">
            <Input
              placeholder="btc, kgen, bob..."
              onChange={(e) => handleSearchChange(e)}
            />
            <div className="absolute top-10 z-10 w-full rounded-xl bg-dark-400 overflow-hidden">
              {searchResult.map((coin) => (
                <div onClick={() => { fetchCoinsData(coin.id) }} key={coin.id} className="h-10 px-5 flex items-center hover:bg-green-500 hover:text-gray-900 hover:cursor-pointer">
                  <p>{coin.name} ({coin.symbol})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DataTable
          tableClassName={cn("bg-dark-500 rounded-xl max-h-fit overflow-hidden", {
            "hidden": !data.length,
          })}
          columns={columns}
          data={data}
          rowKey={(coin) => coin.id}
        />
      </div>
    </>
  )
}

export default page