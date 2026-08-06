import Modal from "../../ui/Modal";

function formatTime(timestamp) {
  if (!timestamp?.toDate) return "-";
  return timestamp.toDate().toLocaleString();
}

function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  return (
    <Modal onClose={onClose}>
      <div className="printable-area">
        <div className="flex justify-between items-start mb-4 print:hidden">
          <h2 className="text-lg font-semibold text-stone-900">
            Order #{order.orderNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 cursor-pointer text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* This heading only shows when printing */}
        <h2 className="hidden print:block text-xl font-bold text-stone-900 mb-4">
          Order #{order.orderNumber}
        </h2>

        <div className="space-y-1 text-sm mb-4">
          <p className="font-medium text-stone-900">{order.customerName}</p>
          <p className="text-stone-600">{order.contactNumber}</p>
          <p className="text-stone-600">{order.deliveryAddress}</p>
          <p className="text-stone-400 text-xs">
            {formatTime(order.createdAt)}
          </p>
        </div>

        <div className="border-t border-stone-200 pt-3 space-y-2 mb-4">
          {order.items.map((item) => (
            <div
              key={`${item.name}-${item.size}`}
              className="flex justify-between text-sm"
            >
              <span className="text-stone-700">
                {item.quantity}x {item.name} ({item.size})
              </span>
              <span className="text-stone-900">P{item.lineTotal}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-200 pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-stone-600">
            <span>Subtotal</span>
            <span>P{order.subtotal}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Delivery Fee</span>
            <span>P{order.deliveryFee}</span>
          </div>
          <div className="flex justify-between font-semibold text-stone-900 pt-1">
            <span>Total</span>
            <span>P{order.total}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="w-full mt-6 border border-stone-300 text-stone-700 py-2.5 rounded-md font-medium cursor-pointer hover:bg-stone-50 print:hidden"
      >
        🖨️ Print Order
      </button>
    </Modal>
  );
}

export default OrderDetailModal;
