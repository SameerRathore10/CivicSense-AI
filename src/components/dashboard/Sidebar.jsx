import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Report Issue", icon: <FaClipboardList />, path: "/report" },
    { name: "Community", icon: <FaUsers />, path: "/community" },
    { name: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-white mb-10">
        CivicSense <span className="text-indigo-500">AI</span>
      </h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;