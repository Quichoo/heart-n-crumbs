import { buildLineItems } from "../../utils/orderUtils";
import Card from "../ui/Card";

const deliveryFee = 10; // TODO: move to Settings later

function OrderSummary({
  quantities,
  products,
  categories,
  onPlaceOrder,
  isSubmitting,
  submitError,
}) {
  const items = buildLineItems(quantities, products, categories);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const total = subtotal + (items.length > 0 ? deliveryFee : 0);

  return (
    <Card title="Order Summary" icon="🧾">
      {items.length === 0 ? (
        <p className="text-stone-400 text-sm">No items selected yet.</p>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.key} className="flex justify-between text-sm">
                <span className="text-stone-700">
                  <span className="inline-block w-5 text-stone-400">
                    {item.quantity}
                  </span>
                  {item.name} ({item.size})
                </span>
                <span className="text-stone-800">P{item.lineTotal}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 pt-3 space-y-1 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Sub Total</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span>{deliveryFee}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-200">
            <span className="font-semibold text-stone-800">Total:</span>
            <span className="text-xl font-bold text-stone-900">P{total}</span>
          </div>

          {submitError && (
            <p className="text-red-600 text-xs mt-2">{submitError}</p>
          )}

          <button
            type="button"
            onClick={onPlaceOrder}
            disabled={isSubmitting}
            className="w-full mt-4 bg-amber-800 text-white py-2.5 rounded-lg font-medium hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </Card>
  );
}

export default OrderSummary;
