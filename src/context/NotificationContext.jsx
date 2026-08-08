import { createContext, useContext, useState, useRef, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);
  const [muted, setMuted] = useState(
    () => localStorage.getItem("notifMuted") === "true",
  );
  const isFirstLoad = useRef(true);
  const audioRef = useRef(null);
  const mutedRef = useRef(muted);

  // Keep mutedRef in sync with muted state, without needing to re-subscribe
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("notifMuted", String(next));
      return next;
    });
  };

  useEffect(() => {
    if (!user) return;

    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      if (isFirstLoad.current) {
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

          if (audioRef.current && !mutedRef.current) {
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
      value={{
        notifications,
        unreadCount,
        markAllRead,
        toast,
        clearToast,
        muted,
        toggleMute,
      }}
    >
      <audio ref={audioRef} src="/Notif.mp3" preload="auto" />
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
