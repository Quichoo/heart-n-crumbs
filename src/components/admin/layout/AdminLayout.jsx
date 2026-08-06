import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Toast from "../notifications/Toast";
import NotificationBell from "../notifications/NotificationBell";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-stone-100 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar - visible on all screen sizes now */}
        <div className="flex items-center justify-between bg-white border-b border-stone-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-stone-700 text-2xl cursor-pointer"
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="hidden lg:block" />{" "}
          {/* spacer to push bell right on desktop */}
          <NotificationBell />
        </div>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

      <Toast />
    </div>
  );
}

export default AdminLayout;
