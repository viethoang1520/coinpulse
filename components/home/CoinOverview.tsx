import { fetcher } from '@/lib/coingecko.actions'
import Image from 'next/image'
import { CoinOverviewFallback } from './fallback'

const CoinOverview = async () => {
  let coin
  try {
    coin = await fetcher<CoinDetailsData>('coins/bitcoin', {
      dex_pair_format: 'symbol'
    })
  } catch (error) {
    console.error('Failed to fetch Bitcoin data:', error)
    return (
      <CoinOverviewFallback/>
    )
  }
    return (
      <div id="coin-overview">
        <div className="header pt-2">
          <Image src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>{coin.name}/ {coin.symbol.toUpperCase()}</p>
            <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1>
          </div>
        </div>
      </div>
    )
 
}

export default CoinOverview