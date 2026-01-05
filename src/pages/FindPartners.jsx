import React, { use, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../contexts/AuthContext";
import Partner from "../components/Partner";
import { motion } from "framer-motion";
import { Search, Filter, ChevronLeft, ChevronRight, Users, SlidersHorizontal } from "lucide-react";

const FindPartners = () => {
  const axiosInstance = useAxios();
  const { user } = use(AuthContext);
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    subject: "",
    experienceLevel: "",
    studyMode: "",
    rating: ""
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [partnersPerPage] = useState(9); // 3x3 grid
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [partners, search, filters]);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/partners");
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
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
        partner.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Subject filter
    if (filters.subject) {
      filtered = filtered.filter(partner =>
        partner.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    // Experience level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(partner =>
        partner.experienceLevel === filters.experienceLevel
      );
    }

    // Study mode filter
    if (filters.studyMode) {
      filtered = filtered.filter(partner =>
        partner.studyMode === filters.studyMode
      );
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(partner =>
        (partner.rating || 0) >= minRating
      );
    }

    setFilteredPartners(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      subject: "",
      experienceLevel: "",
      studyMode: "",
      rating: ""
    });
    setSearch("");
  };

  // Pagination logic
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);
  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find Study <span className="text-primary">Partners</span>
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Connect with like-minded students and enhance your learning experience
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card bg-base-100 shadow-sm"
      >
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, subject, or location..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              className="btn btn-outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              Filters
              {Object.values(filters).some(f => f) && (
                <span className="badge badge-primary badge-sm">Active</span>
              )}
            </button>

            {/* Results Count */}
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <Users size={16} />
              <span>{filteredPartners.length} partners found</span>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-4 mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Subject Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={filters.subject}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Literature">Literature</option>
                  </select>
                </div>

                {/* Experience Level Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Experience Level</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={filters.experienceLevel}
                    onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                {/* Study Mode Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Study Mode</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={filters.studyMode}
                    onChange={(e) => handleFilterChange('studyMode', e.target.value)}
                  >
                    <option value="">All Modes</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Minimum Rating</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex justify-end mt-4">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="skeleton w-16 h-16 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-3 w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="skeleton h-3 w-full"></div>
                  <div className="skeleton h-3 w-3/4"></div>
                </div>
              </div>
            </div>
          ))
        ) : currentPartners.length > 0 ? (
          currentPartners.map((partner, index) => (
            <motion.div
              key={partner._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Partner partner={partner} />
            </motion.div>
          ))
        ) : (
          // No results
          <div className="col-span-full text-center py-16">
            <Users size={64} className="mx-auto text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Partners Found</h3>
            <p className="text-base-content/70 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              className="btn btn-primary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;
              
              // Show first page, last page, current page, and pages around current
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`join-item btn ${isCurrentPage ? 'btn-active' : ''}`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <button key={pageNumber} className="join-item btn btn-disabled">
                    ...
                  </button>
                );
              }
              return null;
            })}
            
            <button
              className="join-item btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FindPartners;
