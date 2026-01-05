import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";

const AdminOverview = () => {
  const axiosSecure = useAxios();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPartners: 0,
    totalConnections: 0,
    activeUsers: 0,
    pendingReports: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch partners data
      const partnersRes = await axiosSecure.get('/partners');
      const partners = partnersRes.data || [];
      
      // Mock additional admin data (in real app, these would be separate endpoints)
      const mockStats = {
        totalUsers: partners.length + Math.floor(Math.random() * 500) + 100,
        totalPartners: partners.length,
        totalConnections: Math.floor(Math.random() * 200) + 50,
        activeUsers: Math.floor(partners.length * 0.7),
        pendingReports: Math.floor(Math.random() * 10)
      };
      
      setStats(mockStats);
      
      // Mock recent activity
      const mockActivity = [
        { id: 1, type: "user_registered", message: "New user registered", time: "2 minutes ago", status: "success" },
        { id: 2, type: "partner_created", message: "New study partner profile created", time: "5 minutes ago", status: "info" },
        { id: 3, type: "connection_made", message: "Study partnership established", time: "10 minutes ago", status: "success" },
        { id: 4, type: "report_submitted", message: "User report submitted", time: "15 minutes ago", status: "warning" },
        { id: 5, type: "user_login", message: "User logged in", time: "20 minutes ago", status: "info" }
      ];
      
      setRecentActivity(mockActivity);
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, change }) => (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <div className={`flex items-center gap-1 text-sm ${change > 0 ? 'text-success' : 'text-error'}`}>
                <TrendingUp size={14} />
                {change > 0 ? '+' : ''}{change}%
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registered': return <UserPlus size={16} />;
      case 'partner_created': return <BookOpen size={16} />;
      case 'connection_made': return <Users size={16} />;
      case 'report_submitted': return <AlertTriangle size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-info';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-base-content/70 mt-1">Monitor and manage StudyMate platform</p>
        </div>
        <div className="badge badge-primary badge-lg">Administrator</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          color="bg-primary"
          change={12}
        />
        <StatCard
          icon={BookOpen}
          title="Study Partners"
          value={stats.totalPartners}
          color="bg-secondary"
          change={8}
        />
        <StatCard
          icon={UserPlus}
          title="Connections"
          value={stats.totalConnections}
          color="bg-accent"
          change={15}
        />
        <StatCard
          icon={Activity}
          title="Active Users"
          value={stats.activeUsers}
          color="bg-info"
          change={5}
        />
        <StatCard
          icon={AlertTriangle}
          title="Pending Reports"
          value={stats.pendingReports}
          color="bg-warning"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">User Growth</h3>
            <div className="space-y-3">
              {[
                { month: "January", users: 120, percentage: 85 },
                { month: "February", users: 145, percentage: 95 },
                { month: "March", users: 180, percentage: 100 },
                { month: "April", users: 165, percentage: 90 },
                { month: "May", users: 200, percentage: 110 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.month}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-base-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(item.percentage / 110) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">{item.users}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-base-200">
                  <div className={`${getStatusColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-base-content/70">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn btn-primary">
              <Users size={16} />
              Manage Users
            </button>
            <button className="btn btn-secondary">
              <BookOpen size={16} />
              Review Partners
            </button>
            <button className="btn btn-accent">
              <AlertTriangle size={16} />
              Handle Reports
            </button>
            <button className="btn btn-info">
              <TrendingUp size={16} />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;