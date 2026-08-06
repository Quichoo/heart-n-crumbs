import Modal from "../ui/Modal";
import { Loader2 } from "lucide-react";

function OrderConfirmModal({ order, onConfirm, onCancel, isSubmitting }) {
  if (!order) return null;

  return (
    <Modal onClose={onCancel}>
      <h2 className="text-lg font-semibold text-stone-900 mb-4">
        Confirm Your Order
      </h2>

      <div className="space-y-1 text-sm mb-4">
        <p className="font-medium text-stone-900">{order.customerName}</p>
        <p className="text-stone-600">{order.contactNumber}</p>
        <p className="text-stone-600">{order.deliveryAddress}</p>
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

      <div className="border-t border-stone-200 pt-3 space-y-1 text-sm mb-6">
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

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 border border-stone-300 text-stone-700 py-2.5 rounded-md font-medium cursor-pointer hover:bg-stone-50"
        >
          Edit Order
        </button>
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="flex-1 bg-btn-primary text-white py-2.5 rounded-md font-medium cursor-pointer hover:bg-[#B99680] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Placing...
            </>
          ) : (
            "Confirm Order"
          )}
        </button>
      </div>
    </Modal>
  );
}

export default OrderConfirmModal;
