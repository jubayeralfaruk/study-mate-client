import { useContext, useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MyConnections = () => {
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
        });
    }
  }, [user, axiosInstance]);

  const handleUpdateModalOpen = (data) => {
    setSelectedPartnerRequest(data);
    console.log(data);
    
    updateModalRef.current.showModal();
  };
  // handleUpdateRequest
  const handleUpdateRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const senderName = form.senderName.value;
    const senderProfileImage = form.senderProfileImage.value;
    const updateSenderData = {
      senderName,
      senderProfileImage,
    };
    console.log(`/partners-request/${selectedPartnerRequest._id}`);

    axiosInstance
      .patch(
        `/partners-request/${selectedPartnerRequest._id}`,
        updateSenderData
      )
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success("Update Successful..!");
        }
        updateModalRef.current.close();
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
              text: "Your file has been deleted.",
              icon: "success",
            });

            const filterRequestData = partners.filter((p) => p._id !== id);
            setPartners(filterRequestData);
          }
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-center">
          My <span className="p-0 text-primary">Connections</span>
        </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[30vh] col-span-full">
          <span className="loading loading-dots loading-xl"></span>
          <span className="loading loading-dots loading-xl"></span>
          <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : partners.length === 0 ? (
        <p className="text-center">
          You haven't created any partner profiles yet.
        </p>
      ) : (
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>#</label>
                  </th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Level</th>
                  <th>Study Mode </th>
                  <th>Availability Time</th>
                  {/* <th>Favorite Color</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 4 */}
                {partners.map((partnerRequest, index) => (
                  <tr key={partnerRequest._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={partnerRequest.profileImage}
                              alt={partnerRequest.name}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{partnerRequest.name}</td>
                    <td>{partnerRequest.subject}</td>
                    <td>{partnerRequest.experienceLevel}</td>
                    <td>{partnerRequest.studyMode}</td>
                    <td>{partnerRequest.availabilityTime}</td>
                    {/* <td>{partnerRequest}</td> */}
                    <th className="space-y-1 md:space-y-0">
                      {/* <button className="btn btn-ghost btn-xs">details</button> */}
                      <button
                        className="btn btn-primary btn-xs mr-1"
                        onClick={() => handleUpdateModalOpen(partnerRequest)}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(partnerRequest._id)}
                        className="btn btn-error btn-xs"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Modal */}
      <>
        <dialog
          ref={updateModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <form onSubmit={handleUpdateRequest} className="card-body">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center">
                Request Connections Update...
              </h3>
              {/* Modal bid form */}
              <fieldset className="fieldset">
                {/* my name */}
                <label className="label">My Name</label>
                <input
                  name="senderName"
                  type="text"
                  className="input"
                  defaultValue={selectedPartnerRequest?.senderName}
                  required
                />
                {/* my url */}
                <label className="label">My Image URL</label>
                <input
                  name="senderProfileImage"
                  type="url"
                  className="input w-full"
                  defaultValue={selectedPartnerRequest?.senderProfileImage}
                  required
                />
              </fieldset>
              <div className="modal-action flex items-center">
                {/* <button type="submit"></button> */}
                <input
                  className="btn primary-btn mt-4"
                  type="submit"
                  value="Submit"
                />
                <button
                  type="button"
                  className="btn mt-4"
                  onClick={() => updateModalRef.current.close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </dialog>
      </>
    </div>
  );
};

export default MyConnections;
