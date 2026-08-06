import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RANGE_LABELS = {
  week: "This Week",
  month: "This Month",
  all: "Last 6 Months",
};

function SalesChart({ getChartData }) {
  const [range, setRange] = useState("week");
  const data = getChartData(range);

  return (
    <div className="bg-white border border-stone-200 rounded-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-stone-900">
          {RANGE_LABELS[range]}'s Revenue
        </h2>
        <div className="flex bg-stone-100 rounded-md p-0.5 text-xs">
          {Object.entries(RANGE_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                range === key
                  ? "bg-white shadow-sm font-medium text-stone-900"
                  : "text-stone-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e7e5e4"
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
            interval={range === "month" ? 2 : 0}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`P${value}`, "Revenue"]}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e7e5e4",
              fontSize: 13,
            }}
          />
          <Bar dataKey="revenue" fill="#A37F6A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
