import { createContext, useState, useEffect, use } from "react";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const { user } = use(AuthContext);
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(true);

  // Admin emails - in a real app, this would come from your backend
  const adminEmails = [
    "jubayeralfaruk@gmail.com", // Your admin email
    "admin@studymate.com",
    "demo@studymate.com", // Demo user can be admin
    // Add more admin emails as needed
  ];

  useEffect(() => {
    if (user?.email) {
      // Check if user is admin
      const isAdmin = adminEmails.includes(user.email);
      setUserRole(isAdmin ? "admin" : "user");
    } else {
      setUserRole("user");
    }
    setLoading(false);
  }, [user]);

  const isAdmin = () => userRole === "admin";
  const isUser = () => userRole === "user";

  const value = {
    userRole,
    isAdmin,
    isUser,
    loading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;