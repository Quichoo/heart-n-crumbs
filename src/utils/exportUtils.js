import * as XLSX from "xlsx";

function formatDateForExport(timestamp) {
  if (!timestamp?.toDate) return "";
  return timestamp.toDate().toLocaleString();
}

function formatItemsForExport(items) {
  return items
    .map((item) => `${item.quantity}x ${item.name} (${item.size})`)
    .join(", ");
}

export function exportOrdersToExcel(orders, filename = "orders") {
  const rows = orders.map((order) => ({
    "Order ID": `#${order.orderNumber}`,
    Customer: order.customerName,
    "Contact Number": order.contactNumber,
    Address: order.deliveryAddress,
    Items: formatItemsForExport(order.items),
    Subtotal: order.subtotal,
    "Delivery Fee": order.deliveryFee,
    Total: order.total,
    Status: order.status,
    Date: formatDateForExport(order.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set reasonable column widths so the export is readable, not cramped
  worksheet["!cols"] = [
    { wch: 10 }, // Order ID
    { wch: 18 }, // Customer
    { wch: 15 }, // Contact Number
    { wch: 30 }, // Address
    { wch: 45 }, // Items
    { wch: 10 }, // Subtotal
    { wch: 12 }, // Delivery Fee
    { wch: 10 }, // Total
    { wch: 10 }, // Status
    { wch: 20 }, // Date
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
