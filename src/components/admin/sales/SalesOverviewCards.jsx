import { TrendingUp, TrendingDown } from "lucide-react";

function ChangeBadge({ pct }) {
  const isPositive = pct >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
    >
      <Icon className="w-3 h-3" />
      {Math.abs(pct)}% vs last week
    </span>
  );
}

function SalesOverviewCards({
  totalRevenue,
  totalOrders,
  revenueChangePct,
  ordersChangePct,
  cancelledThisWeek,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div className="bg-white border border-stone-200 rounded-md p-4">
        <p className="text-sm text-stone-500 mb-1">Total Revenue</p>
        <p className="text-2xl font-bold text-stone-900 mb-1">
          P{totalRevenue}
        </p>
        <ChangeBadge pct={revenueChangePct} />
      </div>
      <div className="bg-white border border-stone-200 rounded-md p-4">
        <p className="text-sm text-stone-500 mb-1">Total Orders</p>
        <p className="text-2xl font-bold text-stone-900 mb-1">{totalOrders}</p>
        <ChangeBadge pct={ordersChangePct} />
      </div>
      <div className="bg-stone-50 border border-stone-200 rounded-md p-4">
        <p className="text-sm text-stone-500 mb-1">Cancelled This Week</p>
        <p className="text-2xl font-bold text-stone-600 mb-1">
          {cancelledThisWeek}
        </p>
        <p className="text-xs text-stone-400">Not counted in revenue</p>
      </div>
    </div>
  );
}

export default SalesOverviewCards;
