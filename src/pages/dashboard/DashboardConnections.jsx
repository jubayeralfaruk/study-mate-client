import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  MapPin, 
  BookOpen,
  Star,
  Globe
} from "lucide-react";

const DashboardConnections = () => {
  const { user } = useContext(AuthContext);
  const updateModalRef = useRef();
  const axiosInstance = useAxios();
  const [partners, setPartners] = useState([]);
  const [selectedPartnerRequest, setSelectedPartnerRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      axiosInstance
        .get(`/partners-request?senderEmail=${user.email}`)
        .then((res) => {
          setPartners(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, axiosInstance]);

  const handleUpdateModalOpen = (data) => {
    setSelectedPartnerRequest(data);
    updateModalRef.current.showModal();
  };

  const handleUpdateRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const senderName = form.senderName.value;
    const senderProfileImage = form.senderProfileImage.value;
    const updateSenderData = {
      senderName,
      senderProfileImage,
    };

    axiosInstance
      .patch(
        `/partners-request/${selectedPartnerRequest._id}`,
        updateSenderData
      )
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success("Connection updated successfully!");
          const updatedPartners = partners.map(p => 
            p._id === selectedPartnerRequest._id 
              ? { ...p, senderName, senderProfileImage }
              : p
          );
          setPartners(updatedPartners);
        }
        updateModalRef.current.close();
      })
      .catch((err) => {
        toast.error("Failed to update connection");
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this connection request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/partners-request/${id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your connection request has been deleted.",
              icon: "success",
            });

            const filterRequestData = partners.filter((p) => p._id !== id);
            setPartners(filterRequestData);
          }
        });
      }
    });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Connections</h1>
          <p className="text-base-content/70 mt-1">
            Manage your study partner connection requests
          </p>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Users size={24} />
            </div>
            <div className="stat-title">Total Connections</div>
            <div className="stat-value text-primary">{partners.length}</div>
          </div>
        </div>
      </div>

      {partners.length === 0 ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center py-16">
            <Users size={64} className="mx-auto text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Connections Yet</h3>
            <p className="text-base-content/70 mb-6">
              You haven't sent any partner connection requests yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {partners.map((partnerRequest, index) => (
            <motion.div
              key={partnerRequest._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        src={partnerRequest.profileImage}
                        alt={partnerRequest.name}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{partnerRequest.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-base-content/70">
                      <Star size={14} className="text-yellow-500" />
                      {partnerRequest.rating || 0} rating
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen size={16} className="text-primary" />
                    <span className="font-medium">Subject:</span>
                    <span>{partnerRequest.subject}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Star size={16} className="text-primary" />
                    <span className="font-medium">Level:</span>
                    <span className="badge badge-outline">{partnerRequest.experienceLevel}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Globe size={16} className="text-primary" />
                    <span className="font-medium">Mode:</span>
                    <span className="badge badge-secondary">{partnerRequest.studyMode}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-primary" />
                    <span className="font-medium">Available:</span>
                    <span className="text-xs">{partnerRequest.availabilityTime}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUpdateModalOpen(partnerRequest)}
                  >
                    <Edit size={14} />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(partnerRequest._id)}
                    className="btn btn-sm btn-error"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <dialog ref={updateModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Connection Request</h3>
          <form onSubmit={handleUpdateRequest} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="senderName"
                type="text"
                className="input input-bordered"
                defaultValue={selectedPartnerRequest?.senderName}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Profile Image URL</span>
              </label>
              <input
                name="senderProfileImage"
                type="url"
                className="input input-bordered"
                defaultValue={selectedPartnerRequest?.senderProfileImage}
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => updateModalRef.current.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardConnections;