import DataTable from "@/components/DataTable"
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import { CoinOverviewFallback, TrendingCoinsFallback } from "@/components/home/fallback";
import { fetcher } from "@/lib/coingecko.actions";
import { cn } from "@/lib/utils"
import { Link, TrendingDown, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Suspense } from "react";


const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">

      </section>
    </main>
  )
}

export default page