import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const STATUS_FLOW = ["pending", "ongoing", "done"];

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const advanceStatus = async (orderId, currentStatus) => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    const nextStatus = STATUS_FLOW[currentIndex + 1];

    if (!nextStatus) return;

    try {
      await updateDoc(doc(db, "orders", orderId), { status: nextStatus });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const setOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return { orders, loading, advanceStatus, setOrderStatus };
}
