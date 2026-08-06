import { useOrders } from "../../hooks/useOrders";
import { useSalesStats } from "../../hooks/useSalesStats";
import SalesOverviewCards from "./sales/SalesOverviewCards";
import SalesChart from "./sales/SalesChart";
import BestSellingCookies from "./sales/BestSellingCookies";
import CustomerBreakdown from "./sales/CustomerBreakdown";

function AdminSales() {
  const { orders, loading } = useOrders();
  const stats = useSalesStats(orders);

  if (loading) {
    return <p className="text-stone-600">Loading sales data...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="font-body text-2xl font-semibold text-stone-900">
          Sales Report
        </h1>
        <button
          onClick={() => window.print()}
          className="text-sm bg-btn-primary text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-[#B99680] transition-colors"
        >
          🖨️ Export PDF
        </button>
      </div>

      <SalesOverviewCards
        totalRevenue={stats.totalRevenue}
        totalOrders={stats.totalOrders}
        revenueChangePct={stats.revenueChangePct}
        ordersChangePct={stats.ordersChangePct}
        cancelledThisWeek={stats.cancelledThisWeek}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 print:hidden">
        <SalesChart getChartData={stats.getChartData} />
        <BestSellingCookies
          thisWeekData={stats.bestSellingThisWeek}
          allTimeData={stats.bestSellingAllTime}
          ordersByCookie={stats.ordersByCookie}
        />
        <CustomerBreakdown
          newCustomers={stats.customerBreakdown.newCustomers}
          returningCustomers={stats.customerBreakdown.returningCustomers}
        />
      </div>

      {/* Print-only formatted report */}
      <div className="printable-area hidden print:block">
        <h1 className="text-xl font-bold text-stone-900 mb-1">
          He[art] 'n Crumbs — Sales Report
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          Generated on {new Date().toLocaleString()}
        </p>

        <h2 className="font-semibold text-stone-900 mb-2">
          This Week's Overview
        </h2>
        <table className="w-full text-sm mb-6 border-collapse">
          <tbody>
            <tr className="border-b border-stone-200">
              <td className="py-1.5 text-stone-600">Total Revenue</td>
              <td className="py-1.5 text-right font-medium">
                P{stats.totalRevenue}
              </td>
            </tr>
            <tr className="border-b border-stone-200">
              <td className="py-1.5 text-stone-600">Total Orders</td>
              <td className="py-1.5 text-right font-medium">
                {stats.totalOrders}
              </td>
            </tr>
            <tr className="border-b border-stone-200">
              <td className="py-1.5 text-stone-600">Cancelled Orders</td>
              <td className="py-1.5 text-right font-medium">
                {stats.cancelledThisWeek}
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="font-semibold text-stone-900 mb-2">
          Best Selling Cookies (This Week)
        </h2>
        <table className="w-full text-sm mb-6 border-collapse">
          <tbody>
            {stats.bestSellingThisWeek.map((item, i) => (
              <tr key={item.name} className="border-b border-stone-200">
                <td className="py-1.5 text-stone-600">
                  {i + 1}. {item.name}
                </td>
                <td className="py-1.5 text-right font-medium">
                  {item.quantity} sold
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="font-semibold text-stone-900 mb-2">
          Customer Breakdown
        </h2>
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr className="border-b border-stone-200">
              <td className="py-1.5 text-stone-600">New Customers</td>
              <td className="py-1.5 text-right font-medium">
                {stats.customerBreakdown.newCustomers}
              </td>
            </tr>
            <tr className="border-b border-stone-200">
              <td className="py-1.5 text-stone-600">Returning Customers</td>
              <td className="py-1.5 text-right font-medium">
                {stats.customerBreakdown.returningCustomers}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSales;
