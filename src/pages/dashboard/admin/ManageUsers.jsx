import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Ban, 
  CheckCircle,
  XCircle,
  Mail,
  Calendar,
  MapPin
} from "lucide-react";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxios();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, search, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/partners');
      const partners = response.data || [];
      
      // Transform partners data to user format with additional mock data
      const usersData = partners.map((partner, index) => ({
        id: partner._id,
        name: partner.name,
        email: partner.email,
        profileImage: partner.profileImage,
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: Math.random() > 0.1 ? 'active' : 'suspended',
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        partnersCount: Math.floor(Math.random() * 10),
        location: partner.location || 'Not specified',
        role: partner.email === 'admin@studymate.com' ? 'admin' : 'user'
      }));
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    // Search filter
    if (search) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      // In a real app, this would be an API call
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
      
      toast.success(`User ${newStatus === 'active' ? 'activated' : 'suspended'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Active</span>;
      case 'suspended':
        return <span className="badge badge-error">Suspended</span>;
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  const getRoleBadge = (role) => {
    return role === 'admin' 
      ? <span className="badge badge-primary">Admin</span>
      : <span className="badge badge-ghost">User</span>;
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-base-content/70 mt-1">Monitor and manage platform users</p>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              className="select select-bordered"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Last Login</th>
                  <th>Partners</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img 
                              src={user.profileImage || "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"} 
                              alt="User" 
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50 flex items-center gap-1">
                            <Mail size={12} />
                            {user.email}
                          </div>
                          <div className="text-sm opacity-50 flex items-center gap-1">
                            <MapPin size={12} />
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar size={12} />
                        {user.joinDate}
                      </div>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <span className="badge badge-outline">{user.partnersCount}</span>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                          <MoreVertical size={16} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li>
                            <button className="flex items-center gap-2">
                              <Eye size={14} />
                              View Profile
                            </button>
                          </li>
                          {user.status === 'active' ? (
                            <li>
                              <button 
                                className="flex items-center gap-2 text-error"
                                onClick={() => handleStatusChange(user.id, 'suspended')}
                              >
                                <Ban size={14} />
                                Suspend User
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button 
                                className="flex items-center gap-2 text-success"
                                onClick={() => handleStatusChange(user.id, 'active')}
                              >
                                <CheckCircle size={14} />
                                Activate User
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-base-content/70">No users found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;