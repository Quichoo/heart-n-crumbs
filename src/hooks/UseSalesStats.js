import { useMemo } from "react";

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift so week starts Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameOrAfter(date, threshold) {
  return date.getTime() >= threshold.getTime();
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function useSalesStats(orders) {
  return useMemo(() => {
    const activeOrders = orders.filter(
      (o) => o.status !== "cancelled" && o.createdAt?.toDate,
    );

    const now = new Date();
    const thisWeekStart = getWeekStart(now);
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const thisWeekOrders = activeOrders.filter((o) =>
      isSameOrAfter(o.createdAt.toDate(), thisWeekStart),
    );
    const lastWeekOrders = activeOrders.filter((o) => {
      const d = o.createdAt.toDate();
      return (
        isSameOrAfter(d, lastWeekStart) && d.getTime() < thisWeekStart.getTime()
      );
    });

    const sum = (list) => list.reduce((s, o) => s + o.total, 0);

    const totalRevenue = sum(thisWeekOrders);
    const totalOrders = thisWeekOrders.length;
    const lastWeekRevenue = sum(lastWeekOrders);
    const lastWeekOrderCount = lastWeekOrders.length;

    const pctChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const revenueChangePct = pctChange(totalRevenue, lastWeekRevenue);
    const ordersChangePct = pctChange(totalOrders, lastWeekOrderCount);

    // Daily breakdown for the chart (Mon..Sun of current week)
    const dailyData = DAY_LABELS.map((label, index) => {
      const dayStart = new Date(thisWeekStart);
      dayStart.setDate(dayStart.getDate() + index);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayOrders = thisWeekOrders.filter((o) => {
        const d = o.createdAt.toDate();
        return (
          d.getTime() >= dayStart.getTime() && d.getTime() < dayEnd.getTime()
        );
      });

      return { day: label, revenue: sum(dayOrders) };
    });

    // Cookie quantity rankings
    const countQuantities = (orderList) => {
      const counts = {};
      orderList.forEach((order) => {
        order.items.forEach((item) => {
          counts[item.name] = (counts[item.name] || 0) + item.quantity;
        });
      });
      return Object.entries(counts)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
    };

    const ordersByCookie = (cookieName) => {
      return activeOrders
        .filter((order) => order.items.some((item) => item.name === cookieName))
        .map((order) => {
          const matchingItems = order.items.filter(
            (item) => item.name === cookieName,
          );
          const totalQty = matchingItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );
          return {
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            quantity: totalQty,
            date: order.createdAt.toDate(),
          };
        })
        .sort((a, b) => b.date - a.date);
    };

    const getChartData = (range) => {
      if (range === "week") {
        return dailyData;
      }

      if (range === "month") {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
        ).getDate();

        return Array.from({ length: daysInMonth }, (_, i) => {
          const dayStart = new Date(monthStart);
          dayStart.setDate(i + 1);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);

          const dayOrders = activeOrders.filter((o) => {
            const d = o.createdAt.toDate();
            return (
              d.getTime() >= dayStart.getTime() &&
              d.getTime() < dayEnd.getTime()
            );
          });

          return { day: String(i + 1), revenue: sum(dayOrders) };
        });
      }

      // "all" -> last 6 months, bucketed by month
      const months = [];
      for (let i = 5; i >= 0; i--) {
        months.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
      }

      return months.map((monthDate) => {
        const monthStart = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          1,
        );
        const monthEnd = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth() + 1,
          1,
        );

        const monthOrders = activeOrders.filter((o) => {
          const d = o.createdAt.toDate();
          return (
            d.getTime() >= monthStart.getTime() &&
            d.getTime() < monthEnd.getTime()
          );
        });

        return {
          day: monthDate.toLocaleDateString(undefined, { month: "short" }),
          revenue: sum(monthOrders),
        };
      });
    };
    const cancelledThisWeek = orders.filter((o) => {
      if (o.status !== "cancelled" || !o.createdAt?.toDate) return false;
      return isSameOrAfter(o.createdAt.toDate(), thisWeekStart);
    }).length;

    const getCustomerBreakdown = () => {
      // Map every contact number to their earliest order date, using ALL active orders (not just this week)
      const firstOrderByContact = {};
      activeOrders.forEach((order) => {
        const contact = order.contactNumber;
        const date = order.createdAt.toDate();
        if (
          !firstOrderByContact[contact] ||
          date < firstOrderByContact[contact]
        ) {
          firstOrderByContact[contact] = date;
        }
      });

      // Among this week's orders, figure out unique customers and whether each is new or returning
      const thisWeekContacts = new Set(
        thisWeekOrders.map((o) => o.contactNumber),
      );

      let newCustomers = 0;
      let returningCustomers = 0;

      thisWeekContacts.forEach((contact) => {
        const firstOrderDate = firstOrderByContact[contact];
        if (firstOrderDate && isSameOrAfter(firstOrderDate, thisWeekStart)) {
          newCustomers += 1;
        } else {
          returningCustomers += 1;
        }
      });

      return { newCustomers, returningCustomers };
    };

    const customerBreakdown = getCustomerBreakdown();

    const bestSellingThisWeek = countQuantities(thisWeekOrders);
    const bestSellingAllTime = countQuantities(activeOrders);

    return {
      totalRevenue,
      totalOrders,
      revenueChangePct,
      ordersChangePct,
      dailyData,
      bestSellingThisWeek,
      bestSellingAllTime,
      ordersByCookie,
      getChartData,
      cancelledThisWeek,
      customerBreakdown,
    };
  }, [orders]);
}
