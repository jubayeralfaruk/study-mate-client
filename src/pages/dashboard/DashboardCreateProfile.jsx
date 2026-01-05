import { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { User, Image, BookOpen, Globe, Clock, MapPin, Award } from "lucide-react";

const DashboardCreateProfile = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const name = form.name.value;
    const profileImage = form.profileImage.value;
    const subject = form.subject.value;
    const studyMode = form.studyMode.value;
    const availabilityTime = form.availabilityTime.value;
    const location = form.location.value;
    const experienceLevel = form.experienceLevel.value;

    const newPartners = {
      name,
      profileImage,
      subject,
      studyMode,
      availabilityTime,
      location,
      experienceLevel,
      rating: 0,
      partnerCount: 0,
      email: user.email,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await axiosInstance.post("/partners", newPartners);
      
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Partner Profile Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create Partner Profile</h1>
        <p className="text-base-content/70 mt-2">
          Create your study partner profile to connect with other students
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User size={20} />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label block">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label block">
                        <span className="label-text">Profile Image URL</span>
                      </label>
                      <input
                        type="url"
                        name="profileImage"
                        placeholder="https://example.com/image.jpg"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Study Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen size={20} />
                    Study Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label block">
                        <span className="label-text">Subject</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="e.g., Mathematics, Physics, Computer Science"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label block">
                        <span className="label-text">Experience Level</span>
                      </label>
                      <select
                        name="experienceLevel"
                        className="select select-bordered w-full"
                        required
                      >
                        <option value="">Select Experience Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Availability & Location */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock size={20} />
                    Availability & Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label block">
                        <span className="label-text">Study Mode</span>
                      </label>
                      <select
                        name="studyMode"
                        className="select select-bordered w-full"
                        required
                      >
                        <option value="">Select Study Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Both">Both Online & Offline</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label block">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        placeholder="e.g., Dhaka, Bangladesh"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label block">
                        <span className="label-text">Availability Time</span>
                      </label>
                      <input
                        type="text"
                        name="availabilityTime"
                        placeholder="e.g., Evening 6–9 PM, Weekends"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Hidden Fields */}
                <input type="hidden" name="rating" value="0" />
                <input type="hidden" name="partnerCount" value="0" />
                <input type="hidden" name="email" value={user?.email} />

                {/* Submit Button */}
                <div className="card-actions justify-end pt- w-full">
                  <button 
                    type="submit" 
                    className="btn w-full primary-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating...
                      </>
                    ) : (
                      "Create Profile"
                    )}
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>

        {/* Preview/Info Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Profile Tips</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Image size={16} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Profile Image</p>
                    <p className="text-base-content/70">Use a clear, professional photo for better connections</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <BookOpen size={16} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Subject</p>
                    <p className="text-base-content/70">Be specific about your study area to find relevant partners</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-base-content/70">Clear time slots help partners plan study sessions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Award size={16} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Experience Level</p>
                    <p className="text-base-content/70">Honest assessment helps match with compatible partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateProfile;