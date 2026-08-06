import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Tags,
  Package,
} from "lucide-react";

const mainNavItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Orders", path: "/admin/orders", icon: ClipboardList },
  { label: "Sales Report", path: "/admin/sales", icon: BarChart3 },
];

const catalogNavItems = [
  { label: "Categories", path: "/admin/categories", icon: Tags },
  { label: "Products", path: "/admin/products", icon: Package },
];

const bottomNavItems = [
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

function NavItem({ item, onClose }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      end={item.path === "/admin"}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-md mb-1 text-sm font-medium transition-colors ${
          isActive
            ? "bg-btn-primary/20 text-btn-primary"
            : "text-stone-600 hover:bg-stone-100"
        }`
      }
    >
      <Icon className="w-4 h-4" />
      {item.label}
    </NavLink>
  );
}

function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-56 min-h-screen bg-white border-r border-stone-200 flex flex-col z-50 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between">
          <img
            src="/logo.png"
            alt="He[art] 'n Crumbs"
            className="h-14 w-auto"
          />
          <button
            onClick={onClose}
            className="lg:hidden text-stone-500 text-xl cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3">
          {mainNavItems.map((item) => (
            <NavItem key={item.path} item={item} onClose={onClose} />
          ))}

          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide px-3 mt-4 mb-1">
            Catalog
          </p>
          {catalogNavItems.map((item) => (
            <NavItem key={item.path} item={item} onClose={onClose} />
          ))}

          <div className="mt-4 pt-4 border-t border-stone-100">
            {bottomNavItems.map((item) => (
              <NavItem key={item.path} item={item} onClose={onClose} />
            ))}
          </div>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 m-3 rounded-md text-sm font-medium text-stone-600 hover:bg-stone-100 cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
