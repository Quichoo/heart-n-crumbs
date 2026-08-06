import StatusDropdown from "./StatusDropdown";

function formatTime(timestamp) {
  if (!timestamp?.toDate) return "-";
  return timestamp.toDate().toLocaleString();
}

function OrderRow({ order, onSelect, onStatusChange }) {
  return (
    <tr
      onClick={() => onSelect(order)}
      className="border-b border-stone-100 last:border-0 cursor-pointer hover:bg-stone-50"
    >
      <td className="px-6 py-4 text-stone-700">#{order.orderNumber}</td>
      <td className="px-6 py-4 text-stone-900 font-medium">
        {order.customerName}
      </td>
      <td className="px-6 py-4 text-stone-700">P{order.total}</td>
      <td className="px-6 py-4">
        <StatusDropdown
          status={order.status}
          onChange={(newStatus) => onStatusChange(order.id, newStatus)}
        />
      </td>
      <td className="px-6 py-4 text-stone-500">
        {formatTime(order.createdAt)}
      </td>
    </tr>
  );
}

export default OrderRow;
