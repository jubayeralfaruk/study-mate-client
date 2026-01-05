import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2,
  Star,
  BookOpen,
  Globe,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManagePartners = () => {
  const axiosSecure = useAxios();
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [partners, search, subjectFilter]);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/partners');
      setPartners(response.data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error('Failed to fetch partners');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...partners];

    // Search filter
    if (search) {
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(search.toLowerCase()) ||
        partner.subject.toLowerCase().includes(search.toLowerCase()) ||
        partner.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Subject filter
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(partner => 
        partner.subject.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }

    setFilteredPartners(filtered);
  };

  const handleDeletePartner = async (partnerId, partnerName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete ${partnerName}'s profile`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/partners/${partnerId}`);
        setPartners(prev => prev.filter(p => p._id !== partnerId));
        toast.success('Partner profile deleted successfully');
      } catch (error) {
        toast.error('Failed to delete partner profile');
      }
    }
  };

  const getSubjects = () => {
    const subjects = [...new Set(partners.map(p => p.subject))];
    return subjects;
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
          <h1 className="text-3xl font-bold">Manage Partners</h1>
          <p className="text-base-content/70 mt-1">Review and manage study partner profiles</p>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Partners</div>
            <div className="stat-value text-primary">{partners.length}</div>
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
                  placeholder="Search partners by name, subject, or email..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Subject Filter */}
            <select
              className="select select-bordered"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {getSubjects().map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner._id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="card-body">
              {/* Header with dropdown */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img 
                        src={partner.profileImage || "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"} 
                        alt="Partner" 
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{partner.name}</h3>
                    <p className="text-sm text-base-content/70">{partner.email}</p>
                  </div>
                </div>
                
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                    <MoreVertical size={16} />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48">
                    <li>
                      <button className="flex items-center gap-2">
                        <Eye size={14} />
                        View Details
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-2">
                        <Edit size={14} />
                        Edit Profile
                      </button>
                    </li>
                    <li>
                      <button 
                        className="flex items-center gap-2 text-error"
                        onClick={() => handleDeletePartner(partner._id, partner.name)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Partner Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen size={16} className="text-primary" />
                  <span className="font-medium">Subject:</span>
                  <span>{partner.subject}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} className="text-primary" />
                  <span className="font-medium">Level:</span>
                  <span className="badge badge-outline">{partner.experienceLevel}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Globe size={16} className="text-primary" />
                  <span className="font-medium">Mode:</span>
                  <span className="badge badge-secondary">{partner.studyMode}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-primary" />
                  <span className="font-medium">Available:</span>
                  <span className="text-xs">{partner.availabilityTime}</span>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-sm font-medium">{partner.rating || 0}</span>
                  </div>
                  <div className="text-sm text-base-content/70">
                    {partner.partnerCount || 0} connections
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex gap-2 mt-4">
                <div className="badge badge-success badge-sm">
                  <CheckCircle size={10} className="mr-1" />
                  Verified
                </div>
                <div className="badge badge-info badge-sm">
                  Active
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center py-16">
            <BookOpen size={64} className="mx-auto text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Partners Found</h3>
            <p className="text-base-content/70">
              No study partners match your current search criteria
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePartners;