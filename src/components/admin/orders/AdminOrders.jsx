import { useState, useMemo } from "react";
import { useOrders } from "../../../hooks/useOrders";
import { exportOrdersToExcel } from "../../../utils/exportUtils";
import OrderDetailModal from "./OrderDetailModal";
import OrderRow from "./OrderRow";

function AdminOrders() {
  const { orders, loading, setOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredOrders = useMemo(() => {
    if (!startDate && !endDate) return orders;

    return orders.filter((order) => {
      if (!order.createdAt?.toDate) return false;
      const orderDate = order.createdAt.toDate();

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (orderDate < start) return false;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (orderDate > end) return false;
      }

      return true;
    });
  }, [orders, startDate, endDate]);

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  const handleExport = () => {
    const rangeLabel =
      startDate || endDate
        ? `orders_${startDate || "start"}_to_${endDate || "end"}`
        : "orders_all";
    exportOrdersToExcel(filteredOrders, rangeLabel);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <h1 className="font-body text-2xl font-semibold text-stone-900">
          Orders
        </h1>

        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              From
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-stone-300 rounded-md px-2.5 py-1.5 text-sm text-stone-800 bg-white w-full sm:w-auto"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              To
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-stone-300 rounded-md px-2.5 py-1.5 text-sm text-stone-800 bg-white w-full sm:w-auto"
            />
          </div>
          {(startDate || endDate) && (
            <button
              onClick={clearFilter}
              className="text-sm text-stone-500 hover:text-stone-800 cursor-pointer px-2 py-1.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleExport}
            disabled={filteredOrders.length === 0}
            className="text-sm bg-btn-primary text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-[#B99680] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Export to Excel
          </button>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-md">
        {loading ? (
          <p className="p-6 text-stone-600">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="p-6 text-stone-600">
            {orders.length === 0
              ? "No orders yet."
              : "No orders in this date range."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr className="text-left text-stone-500">
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    onSelect={setSelectedOrder}
                    onStatusChange={setOrderStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default AdminOrders;
