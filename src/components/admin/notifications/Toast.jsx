import { useEffect } from "react";
import { useNotifications } from "../../../context/NotificationContext";

function Toast() {
  const { toast, clearToast } = useNotifications();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(clearToast, 4000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="fixed top-4 right-4 z-60 bg-white border border-stone-200 shadow-lg rounded-md px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top">
      <span className="text-xl">🔔</span>
      <p className="text-sm text-stone-800">{toast}</p>
      <button
        onClick={clearToast}
        className="text-stone-400 hover:text-stone-700 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
