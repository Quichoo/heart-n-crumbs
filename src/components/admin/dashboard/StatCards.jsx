function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-stone-200 rounded-md p-4">
        <p className="text-sm text-stone-500 mb-1">New Orders</p>
        <p className="text-2xl font-bold text-stone-900">{stats.newOrders}</p>
      </div>
      <div className="bg-white border border-stone-200 rounded-md p-4">
        <p className="text-sm text-stone-500 mb-1">Preparing</p>
        <p className="text-2xl font-bold text-stone-900">{stats.preparing}</p>
      </div>
      <div className="bg-white border border-stone-200 rounded-md p-4">
        <p className="text-sm text-stone-500 mb-1">Delivered</p>
        <p className="text-2xl font-bold text-stone-900">{stats.delivered}</p>
      </div>
      <div className="bg-white border border-stone-200 rounded-md p-4">
        <p className="text-sm text-stone-500 mb-1">Revenue Today</p>
        <p className="text-2xl font-bold text-stone-900">
          P{stats.revenueToday}
        </p>
      </div>
    </div>
  );
}

export default StatCards;
