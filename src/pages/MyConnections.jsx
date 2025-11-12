import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

const MyConnections = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/partners?email=${user.email}`)
        .then((res) => setPartners(res.data));
    }
  }, [user, axiosInstance]);

  // handle delete
  const handleDelete = (id) => {
    if (!confirm("Do you want to delete this profile?")) return;

    axiosInstance.delete(`/partners/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Profile deleted successfully!");

          // remove from UI
          setPartners(partners.filter((p) => p._id !== id));
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Connections
      </h2>

      {partners.length === 0 && (
        <p className="text-center">You haven't created any partner profiles yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner._id} className="p-4 shadow-md rounded-md border">

            <img
              src={partner.profileImage}
              alt={partner.name}
              className="w-full h-56 object-cover rounded-md"
            />

            <h3 className="text-xl font-bold mt-3">{partner.name}</h3>
            <p className="text-gray-600">{partner.subject}</p>
            <p className="text-gray-500">{partner.location}</p>

            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/update-partner/${partner._id}`}
                className="btn btn-primary btn-sm"
              >
                Update
              </Link>

              <button
                onClick={() => handleDelete(partner._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyConnections;
