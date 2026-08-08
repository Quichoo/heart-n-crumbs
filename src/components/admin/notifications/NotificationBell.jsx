import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { useNotifications } from "../../../context/NotificationContext";

function NotificationBell() {
  const { notifications, unreadCount, markAllRead, muted, toggleMute } =
    useNotifications();
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
          <div className="flex justify-between items-center px-4 py-2 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-500 uppercase">
              Notifications
            </span>
            <button
              onClick={toggleMute}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              {muted ? (
                <BellOff className="w-3.5 h-3.5" />
              ) : (
                <Bell className="w-3.5 h-3.5" />
              )}
              {muted ? "Muted" : "Sound On"}
            </button>
          </div>

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
