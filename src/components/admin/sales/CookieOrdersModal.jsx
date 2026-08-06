import Modal from "../../ui/Modal";

function CookieOrdersModal({ cookieName, orders, onClose }) {
  if (!cookieName) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-stone-900">{cookieName}</h2>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 cursor-pointer text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-stone-500 text-sm">No orders found.</p>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => (
            <div
              key={order.orderNumber}
              className="flex justify-between items-center border-b border-stone-100 last:border-0 pb-2"
            >
              <div>
                <p className="text-sm font-medium text-stone-900">
                  #{order.orderNumber} — {order.customerName}
                </p>
                <p className="text-xs text-stone-400">
                  {order.date.toLocaleString()}
                </p>
              </div>
              <span className="text-sm font-medium text-stone-700">
                {order.quantity}x
              </span>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default CookieOrdersModal;
