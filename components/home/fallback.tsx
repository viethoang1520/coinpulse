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