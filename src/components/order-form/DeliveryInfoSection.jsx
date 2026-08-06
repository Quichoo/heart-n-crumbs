import Card from "../ui/Card";
import { Bike } from "lucide-react";

function DeliveryInfoSection({ customerInfo, updateCustomerInfo, errors }) {
  return (
    <Card title="Delivery Information" icon={<Bike className="w-5 h-5" />}>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Address
        </label>
        <textarea
          placeholder="Enter your address..."
          value={customerInfo.address}
          onChange={(e) => updateCustomerInfo("address", e.target.value)}
          rows={4}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
        />
        {errors?.address && (
          <p className="text-red-600 text-xs mt-1">{errors.address}</p>
        )}
      </div>
    </Card>
  );
}

export default DeliveryInfoSection;
