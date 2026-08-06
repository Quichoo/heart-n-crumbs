import { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { useOrderStats } from "../../hooks/useOrderStats";
import { useSalesStats } from "../../hooks/useSalesStats";
import StatCards from "./dashboard/StatCards";
import RecentOrdersTable from "./dashboard/RecentOrdersTable";
import NewOrdersPanel from "./dashboard/NewOrdersPanel";
import SalesSummaryCard from "./dashboard/SalesSummaryCard";
import OrderDetailModal from "./orders/OrderDetailModal";

function AdminDashboard() {
  const { orders, loading, advanceStatus, setOrderStatus } = useOrders();
  const stats = useOrderStats(orders);
  const salesStats = useSalesStats(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const recentOrders = orders.slice(0, 5);
  const newOrdersList = orders
    .filter((o) => o.status === "pending")
    .slice(0, 4);

  return (
    <div>
      <h1 className="font-heading italic text-3xl text-stone-900 mb-1">
        Welcome back, Admin!
      </h1>
      <p className="text-stone-600 mb-6">
        Here's what's happening with your cookie shop today.
      </p>

      <StatCards stats={stats} />

      <SalesSummaryCard
        totalRevenue={salesStats.totalRevenue}
        totalOrders={salesStats.totalOrders}
        revenueChangePct={salesStats.revenueChangePct}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrdersTable
          orders={recentOrders}
          loading={loading}
          onSelect={setSelectedOrder}
          onStatusChange={setOrderStatus}
        />
        <NewOrdersPanel orders={newOrdersList} onAccept={advanceStatus} />
      </div>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default AdminDashboard;
