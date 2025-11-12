import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const CreatePartnerProfile = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const profileImage = form.profileImage.value;
    const subject = form.subject.value;
    const studyMode = form.studyMode.value;
    const availabilityTime = form.availabilityTime.value;
    const location = form.location.value;
    const experienceLevel = form.experienceLevel.value;
    // const rating = form.rating.value;
    // const partnerCount = form.partnerCount.value;

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
      email: user.email
    };

    axiosInstance
      .post("/partners", newPartners)
      .then((data) => {
        console.log(data.data);
        if (data.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Create Partner Profile Successfully..!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset()
        }
      });
  };
  return (
    <div className="max-w-xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Partner Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          defaultValue={user?.displayName}
          required
        />

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          className="input input-bordered w-full"
          defaultValue={user?.photoURL}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject (e.g., Math)"
          className="input input-bordered w-full"
          required
        />

        <select
          name="studyMode"
          className="select select-bordered w-full"
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
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Dhaka)"
          className="input input-bordered w-full"
          required
        />

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

        <input
          type="number"
          name="rating"
          className="input input-bordered w-full"
          min="0"
          defaultValue={0}
          readOnly
        />

        <input
          type="number"
          name="partnerCount"
          className="input input-bordered w-full"
          defaultValue={0}
          readOnly
        />

        {/* Logged-in email */}
        <input
          type="email"
          name="email"
          className="input input-bordered w-full"
          defaultValue={user?.email}
          readOnly
        />

        <button className="btn btn-primary w-full">Create Profile</button>
      </form>
    </div>
  );
};

export default CreatePartnerProfile;
