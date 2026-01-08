import DataTable from '../DataTable'

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton"></div>
        <div className="info">
          <div className="header-line-sm skeleton"></div>
          <div className="header-line-lg skeleton"></div>
        </div>
      </div>

      <div className="period-buttons flex gap-2 mt-4 mb-6">
        <div className="period-button-skeleton skeleton"></div>
        <div className="period-button-skeleton skeleton"></div>
        <div className="period-button-skeleton skeleton"></div>
        <div className="period-button-skeleton skeleton"></div>
      </div>

      <div className="chart">
        <div className="chart-skeleton skeleton"></div>
      </div>
    </div>
  )
}

export const TrendingCoinsFallback = () => {
  // Create skeleton data for the table
  const skeletonData = Array.from({ length: 6 }, (_, index) => ({
    id: `skeleton-${index}`,
    index
  }))

  const skeletonColumns: DataTableColumn<{ id: string; index: number }>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton"></div>
          <div>
            <div className="name-line skeleton mb-1"></div>
            <div className="name-line skeleton w-16"></div>
          </div>
        </div>
      )
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton"></div>
          <div className="change-line skeleton"></div>
        </div>
      )
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => (
        <div className="price-line skeleton"></div>
      )
    },
    {
      header: "Market Cap Rank",
      cellClassName: "rank-cell",
      cell: () => (
        <div className="change-line skeleton w-12"></div>
      )
    }
  ]

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        data={skeletonData}
        columns={skeletonColumns}
        rowKey={(item) => item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2"
      />
    </div>
  )
}

export const CategoriesFallback = () => {
  // Create skeleton data for the categories table
  const skeletonData = Array.from({ length: 10 }, (_, index) => ({
    id: `skeleton-${index}`,
    index
  }))

  const skeletonColumns: DataTableColumn<{ id: string; index: number }>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: () => (
        <div className="category-name skeleton w-32 h-4"></div>
      )
    },
    {
      header: "Top Gainers",
      cellClassName: 'top-gainers-cell',
      cell: () => (
        <div className="flex gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="coin-image-skeleton skeleton w-7 h-7 rounded-full"></div>
          ))}
        </div>
      )
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: () => (
        <div className="change-cell">
          <div className="change-line skeleton w-16 h-4 mb-1"></div>
          <div className="change-icon skeleton w-4 h-4"></div>
        </div>
      )
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => (
        <div className="market-cap-line skeleton w-24 h-4"></div>
      )
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: () => (
        <div className="volume-line skeleton w-20 h-4"></div>
      )
    }
  ]

  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable
        columns={skeletonColumns}
        data={skeletonData}
        rowKey={(item) => item.id}
        tableClassName="mt-3"
      />
    </div>
  )
}

export const EventsPageFallback = () => {
  // Create skeleton data for the events table
  const skeletonData = Array.from({ length: 8 }, (_, index) => ({
    id: `skeleton-${index}`,
    index
  }))

  const skeletonColumns: DataTableColumn<{ id: string; index: number }>[] = [
    {
      header: "Name",
      cell: () => (
        <div className="name-line skeleton w-24 h-4"></div>
      )
    },
    {
      header: "Symbol",
      cell: () => (
        <div className="symbol-line skeleton w-12 h-4"></div>
      )
    },
    {
      header: "Price",
      cell: () => (
        <div className="price-line skeleton w-20 h-4"></div>
      )
    },
    {
      header: "Event Token",
      cell: () => (
        <div className="token-line skeleton w-16 h-4"></div>
      )
    },
    {
      header: "24h Change",
      cell: () => (
        <div className="flex gap-1 items-center">
          <div className="change-line skeleton w-14 h-4"></div>
          <div className="change-icon skeleton w-4 h-4"></div>
        </div>
      )
    },
    {
      header: "Market Cap",
      cell: () => (
        <div className="market-cap-line skeleton w-24 h-4"></div>
      )
    }
  ]

  return (
    <div className="main-container">
      {/* Title skeleton */}
      <div className="title-skeleton skeleton w-32 h-6 mb-4"></div>

      {/* Search section skeleton */}
      <div className="flex-center max-w-[80%] gap-2 mb-4">
        <div className="label-skeleton skeleton w-20 h-4"></div>
        <div className="relative w-full">
          <div className="input-skeleton skeleton w-full h-10 rounded-md"></div>
        </div>
      </div>

      {/* DataTable skeleton */}
      <DataTable
        columns={skeletonColumns}
        data={skeletonData}
        rowKey={(item) => item.id}
        tableClassName="mt-4"
      />
    </div>
  )
}