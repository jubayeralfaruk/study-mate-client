import React, { use } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { AdminContext } from "../contexts/AdminContext";
import { toast } from "react-toastify";
import { 
  Home, 
  User, 
  Users, 
  PlusCircle, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Shield,
  Settings,
  BookOpen
} from "lucide-react";
import { useState } from "react";

const DashboardLayout = () => {
  const { user, logout } = use(AuthContext);
  const { isAdmin, userRole } = use(AdminContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const userSidebarItems = [
    { path: "/dashboard", icon: BarChart3, label: "Dashboard Overview", exact: true },
    { path: "/dashboard/profile", icon: User, label: "My Profile" },
    { path: "/dashboard/create-profile", icon: PlusCircle, label: "Create Partner Profile" },
    { path: "/dashboard/connections", icon: Users, label: "My Connections" },
  ];

  const adminSidebarItems = [
    { path: "/dashboard", icon: BarChart3, label: "Dashboard Overview", exact: true },
    { path: "/dashboard/admin", icon: Shield, label: "Admin Overview", exact: true },
    { path: "/dashboard/admin/users", icon: Users, label: "Manage Users" },
    { path: "/dashboard/admin/partners", icon: BookOpen, label: "Manage Partners" },
    { path: "/dashboard/profile", icon: User, label: "My Profile" },
  ];

  const sidebarItems = isAdmin() ? adminSidebarItems : userSidebarItems;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navbar */}
      <div className="navbar bg-base-100 shadow-sm border-b">
        <div className="navbar-start">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="text-xl font-bold">
            Study<span className="text-primary">Mate</span>
          </Link>
        </div>
        
        <div className="navbar-center">
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-70">Dashboard</span>
            {isAdmin() && (
              <div className="badge badge-primary badge-sm">
                <Shield size={10} className="mr-1" />
                Admin
              </div>
            )}
          </div>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"}
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/dashboard/profile">
                  <User size={16} />
                  Profile
                </NavLink>
              </li>
              {isAdmin() && (
                <li>
                  <NavLink to="/dashboard/admin">
                    <Shield size={16} />
                    Admin Panel
                  </NavLink>
                </li>
              )}
              <li>
                <Link to="/">
                  <Home size={16} />
                  Back to Home
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 pt-20 lg:pt-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;