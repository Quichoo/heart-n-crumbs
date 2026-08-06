import { useState } from "react";
import { useNotifications } from "../../../context/NotificationContext";

function NotificationBell() {
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!open) markAllRead();
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative text-xl cursor-pointer"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-md shadow-md py-2 z-50 max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-sm text-stone-500 px-4 py-3">
              No notifications yet.
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
              >
                New order #{n.orderNumber} from {n.customerName}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
