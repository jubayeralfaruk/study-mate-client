import React, { useState, useEffect, use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { Camera, Mail, User, Calendar, MapPin, Phone } from "lucide-react";

const DashboardProfile = () => {
  const { user, updateUserProfile } = use(AuthContext);
  const axiosSecure = useAxios();
  const [profile, setProfile] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    phone: "",
    location: "",
    bio: "",
    joinDate: new Date().toLocaleDateString()
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Try to get additional profile data from your backend
      const response = await axiosSecure.get(`/user-profile?email=${user?.email}`);
      if (response.data) {
        setProfile(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      console.log("No additional profile data found");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Update Firebase profile
      if (profile.displayName !== user?.displayName || profile.photoURL !== user?.photoURL) {
        await updateUserProfile(profile.displayName, profile.photoURL);
      }

      // Save additional profile data to backend
      await axiosSecure.put('/user-profile', {
        email: user?.email,
        ...profile
      });

      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button
          className="btn btn-primary"
          onClick={() => editing ? handleSaveProfile() : setEditing(true)}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : editing ? (
            "Save Changes"
          ) : (
            "Edit Profile"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body text-center">
              <div className="avatar mb-4">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src={profile.photoURL || "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"} 
                    alt="Profile" 
                  />
                </div>
              </div>
              
              {editing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="displayName"
                    value={profile.displayName}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Display Name"
                  />
                  <input
                    type="url"
                    name="photoURL"
                    value={profile.photoURL}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Photo URL"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{profile.displayName}</h2>
                  <p className="text-base-content/70">{profile.email}</p>
                </>
              )}
              
              <div className="flex items-center justify-center gap-2 text-sm text-base-content/70 mt-4">
                <Calendar size={16} />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-6">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    className="input input-bordered"
                    disabled
                  />
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Phone size={16} />
                      Phone
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Your phone number"
                    disabled={!editing}
                  />
                </div>

                {/* Location */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <MapPin size={16} />
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Your location"
                    disabled={!editing}
                  />
                </div>

                {/* Bio */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <User size={16} />
                      Bio
                    </span>
                  </label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-24"
                    placeholder="Tell us about yourself..."
                    disabled={!editing}
                  />
                </div>
              </div>

              {editing && (
                <div className="card-actions justify-end mt-6">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveProfile}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;