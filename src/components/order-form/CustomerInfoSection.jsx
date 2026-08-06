import { User } from "lucide-react";
import Card from "../ui/Card";

function CustomerInfoSection({ customerInfo, updateCustomerInfo, errors }) {
  return (
    <Card title="Customer Information" icon={<User className="w-5 h-5" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={customerInfo.name}
            onChange={(e) => updateCustomerInfo("name", e.target.value)}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
          />
          {errors?.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            placeholder="09123456789"
            value={customerInfo.contactNumber}
            onChange={(e) =>
              updateCustomerInfo("contactNumber", e.target.value)
            }
            className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
          />
          {errors?.contactNumber && (
            <p className="text-red-600 text-xs mt-1">{errors.contactNumber}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default CustomerInfoSection;
