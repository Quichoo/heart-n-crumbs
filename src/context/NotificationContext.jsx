import { createContext, useContext, useState, useRef, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);
  const isFirstLoad = useRef(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!user) return; // only listen while logged in as admin

    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      if (isFirstLoad.current) {
        // Skip notifying for orders that already existed when the panel first loaded
        isFirstLoad.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const order = { id: change.doc.id, ...change.doc.data() };

          setNotifications((prev) => [
            {
              id: order.id,
              orderNumber: order.orderNumber,
              customerName: order.customerName,
              read: false,
            },
            ...prev,
          ]);

          setToast(
            `New order #${order.orderNumber} from ${order.customerName}`,
          );

          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        }
      });
    });

    return () => unsubscribe();
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearToast = () => setToast(null);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllRead, toast, clearToast }}
    >
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
