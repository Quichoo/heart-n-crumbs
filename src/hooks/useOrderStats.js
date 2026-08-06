export function useOrderStats(orders) {
  const isToday = (timestamp) => {
    if (!timestamp?.toDate) return false;
    const date = timestamp.toDate();
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const activeOrders = orders.filter((o) => o.status !== "cancelled");

  const newOrders = activeOrders.filter((o) => o.status === "pending").length;
  const preparing = activeOrders.filter((o) => o.status === "ongoing").length;
  const delivered = activeOrders.filter((o) => o.status === "done").length;

  const revenueToday = activeOrders
    .filter((o) => isToday(o.createdAt))
    .reduce((sum, o) => sum + o.total, 0);

  return { newOrders, preparing, delivered, revenueToday };
}
