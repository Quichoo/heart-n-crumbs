import OrderRow from "../orders/OrderRow";

function RecentOrdersTable({ orders, loading, onSelect, onStatusChange }) {
  return (
    <div className="lg:col-span-2 bg-white border border-stone-200 rounded-md p-5">
      <h2 className="font-semibold text-stone-900 mb-4">Recent Orders</h2>
      {loading ? (
        <p className="text-stone-500 text-sm">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-stone-500 text-sm">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone-500 border-b border-stone-100">
                <th className="py-2 font-medium">Order ID</th>
                <th className="py-2 font-medium">Customer</th>
                <th className="py-2 font-medium">Total</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onSelect={onSelect}
                  onStatusChange={onStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentOrdersTable;
