import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";

function SalesSummaryCard({ totalRevenue, totalOrders, revenueChangePct }) {
  const isPositive = revenueChangePct >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white border border-stone-200 rounded-md p-5 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-stone-900">This Week's Sales</h2>
        <Link
          to="/admin/sales"
          className="text-xs text-btn-primary font-medium hover:underline"
        >
          View Full Report →
        </Link>
      </div>

      <div className="flex items-end gap-6">
        <div>
          <p className="text-sm text-stone-500 mb-1">Revenue</p>
          <p className="text-2xl font-bold text-stone-900">P{totalRevenue}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500 mb-1">Orders</p>
          <p className="text-2xl font-bold text-stone-900">{totalOrders}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium mb-1 ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          <Icon className="w-3 h-3" />
          {Math.abs(revenueChangePct)}% vs last week
        </span>
      </div>
    </div>
  );
}

export default SalesSummaryCard;
