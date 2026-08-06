import { useState } from "react";
import CookieOrdersModal from "./CookieOrdersModal";

function BestSellingCookies({ thisWeekData, allTimeData, ordersByCookie }) {
  const [filter, setFilter] = useState("week");
  const [selectedCookie, setSelectedCookie] = useState(null);
  const data = filter === "week" ? thisWeekData : allTimeData;

  return (
    <div className="bg-white border border-stone-200 rounded-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-stone-900">Best Selling Cookies</h2>
        <div className="flex bg-stone-100 rounded-md p-0.5 text-xs">
          <button
            onClick={() => setFilter("week")}
            className={`px-2.5 py-1 rounded cursor-pointer ${filter === "week" ? "bg-white shadow-sm font-medium text-stone-900" : "text-stone-500"}`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded cursor-pointer ${filter === "all" ? "bg-white shadow-sm font-medium text-stone-900" : "text-stone-500"}`}
          >
            All Time
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-stone-500 text-sm">No sales data yet.</p>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <button
              key={item.name}
              onClick={() => setSelectedCookie(item.name)}
              className="flex items-center gap-3 w-full text-left cursor-pointer hover:bg-stone-50 rounded-md p-1 -m-1 transition-colors"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-btn-primary/15 text-btn-primary text-xs font-bold rounded-full shrink-0">
                {index + 1}
              </span>
              <span className="flex-1 text-sm text-stone-800">{item.name}</span>
              <span className="text-sm font-medium text-stone-600">
                {item.quantity} sold
              </span>
            </button>
          ))}
        </div>
      )}

      <CookieOrdersModal
        cookieName={selectedCookie}
        orders={selectedCookie ? ordersByCookie(selectedCookie) : []}
        onClose={() => setSelectedCookie(null)}
      />
    </div>
  );
}

export default BestSellingCookies;
