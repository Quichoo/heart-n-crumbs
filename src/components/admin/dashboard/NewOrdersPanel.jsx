function formatTime(timestamp) {
  if (!timestamp?.toDate) return "-";
  return timestamp
    .toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function NewOrdersPanel({ orders, onAccept }) {
  return (
    <div className="bg-white border border-stone-200 rounded-md p-5">
      <h2 className="font-semibold text-stone-900 mb-4">New Orders</h2>
      {orders.length === 0 ? (
        <p className="text-stone-500 text-sm">No new orders.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-stone-100 rounded-md p-3"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-stone-900 text-sm">
                    #{order.orderNumber}
                  </p>
                  <p className="text-stone-600 text-sm">{order.customerName}</p>
                </div>
                <span className="text-xs text-stone-400">
                  {formatTime(order.createdAt)}
                </span>
              </div>
              <div className="space-y-0.5 mb-2">
                {order.items.map((item) => (
                  <p
                    key={`${item.name}-${item.size}`}
                    className="text-xs text-stone-500"
                  >
                    {item.quantity}x {item.name} ({item.size})
                  </p>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-stone-900">
                  P{order.total}
                </span>
                <button
                  onClick={() => onAccept(order.id, order.status)}
                  className="bg-btn-primary text-white text-xs font-medium px-3 py-1.5 rounded-md cursor-pointer hover:bg-[#B99680] transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewOrdersPanel;
