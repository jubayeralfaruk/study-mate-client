import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    subject: "",
    studyMode: "",
    availabilityTime: "",
    location: "",
    experienceLevel: "",
    rating: 0,
    partnerCount: 0,
    email: user?.email || ""
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Profile created successfully!");
        navigate("/myProfile"); // redirect anywhere you want
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create profile!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create Partner Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          className="input input-bordered w-full"
          value={formData.profileImage}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject (e.g., Math)"
          className="input input-bordered w-full"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <select
          name="studyMode"
          className="select select-bordered w-full"
          value={formData.studyMode}
          onChange={handleChange}
          required
        >
          <option value="">Select Study Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <input
          type="text"
          name="availabilityTime"
          placeholder="Availability Time (e.g. Evening 6–9 PM)"
          className="input input-bordered w-full"
          value={formData.availabilityTime}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Dhaka)"
          className="input input-bordered w-full"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <select
          name="experienceLevel"
          className="select select-bordered w-full"
          value={formData.experienceLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>

        <input
          type="number"
          name="rating"
          className="input input-bordered w-full"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          readOnly
        />

        <input
          type="number"
          name="partnerCount"
          className="input input-bordered w-full"
          value={formData.partnerCount}
          readOnly
        />

        {/* Logged-in email */}
        <input
          type="email"
          name="email"
          className="input input-bordered w-full"
          value={formData.email}
          readOnly
        />

        <button className="btn btn-primary w-full">Create Profile</button>
      </form>
    </div>
  );
};

export default CreatePartnerProfile;
