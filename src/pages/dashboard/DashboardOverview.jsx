import React, { useState, useEffect, use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import { 
  Users, 
  UserPlus, 
  Star, 
  TrendingUp,
  Calendar,
  BookOpen
} from "lucide-react";

const DashboardOverview = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();
  const [stats, setStats] = useState({
    totalPartners: 0,
    myConnections: 0,
    averageRating: 0,
    profileViews: 0
  });
  const [recentConnections, setRecentConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's connections
      const connectionsRes = await axiosSecure.get(`/connections?email=${user?.email}`);
      const connections = connectionsRes.data || [];
      
      // Fetch all partners for total count
      const partnersRes = await axiosSecure.get('/partners');
      const allPartners = partnersRes.data || [];
      
      // Calculate stats
      const userProfile = allPartners.find(p => p.email === user?.email);
      const averageRating = userProfile?.rating || 0;
      
      setStats({
        totalPartners: allPartners.length,
        myConnections: connections.length,
        averageRating: averageRating,
        profileViews: Math.floor(Math.random() * 100) + 50 // Mock data
      });
      
      // Set recent connections (last 5)
      setRecentConnections(connections.slice(-5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 text-sm text-success">
                <TrendingUp size={14} />
                {trend}
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

  const SimpleChart = ({ data, title }) => (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{item.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-base-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const chartData = [
    { label: "Computer Science", value: 45, percentage: 75 },
    { label: "Mathematics", value: 32, percentage: 60 },
    { label: "Physics", value: 28, percentage: 50 },
    { label: "Chemistry", value: 22, percentage: 40 },
    { label: "Biology", value: 18, percentage: 30 }
  ];

  const activityData = [
    { label: "Profile Views", value: stats.profileViews, percentage: 80 },
    { label: "Connection Requests", value: stats.myConnections, percentage: 60 },
    { label: "Study Sessions", value: Math.floor(Math.random() * 20) + 5, percentage: 45 },
    { label: "Messages Sent", value: Math.floor(Math.random() * 50) + 10, percentage: 70 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.displayName || 'Student'}!</h1>
          <p className="text-base-content/70 mt-1">Here's what's happening with your study partnerships</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-70">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Partners"
          value={stats.totalPartners}
          color="bg-primary"
          trend="+12% this month"
        />
        <StatCard
          icon={UserPlus}
          title="My Connections"
          value={stats.myConnections}
          color="bg-secondary"
          trend="+5 new"
        />
        <StatCard
          icon={Star}
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          color="bg-accent"
        />
        <StatCard
          icon={Calendar}
          title="Profile Views"
          value={stats.profileViews}
          color="bg-info"
          trend="+8% this week"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart 
          data={chartData} 
          title="Popular Study Subjects" 
        />
        <SimpleChart 
          data={activityData} 
          title="Your Activity Overview" 
        />
      </div>

      {/* Recent Connections Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Recent Connections</h3>
          {recentConnections.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Partner</th>
                    <th>Subject</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentConnections.map((connection, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img 
                                src={connection.image || "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"} 
                                alt="Partner" 
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{connection.name}</div>
                            <div className="text-sm opacity-50">{connection.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost">{connection.subject}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500" />
                          {connection.rating}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">Connected</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen size={48} className="mx-auto text-base-content/30 mb-4" />
              <p className="text-base-content/70">No connections yet. Start connecting with study partners!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;