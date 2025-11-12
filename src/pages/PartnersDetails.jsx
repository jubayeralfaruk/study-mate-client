import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ImStarFull } from "react-icons/im";
import { AuthContext } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

const PartnerDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [partner, setPartner] = useState(null);
  const [connectionsPartner, setConnectionsPartner] = useState([]);
  console.log("connectionsPartner", connectionsPartner);

  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  // Fetch partner details
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: `/partner/${id}` } });
      return;
    }

    axiosInstance
      .get(`/partners/${id}`)
      .then((data) => {
        setPartner(data.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Error fetching partner data");
        setLoading(false);
      });

    axiosInstance
      .get(`/partners-request`)
      .then((data) => {
        const findRequest = data.data.find(
          (request) => request.partnerId === id
        );

        const findRequest2 = data.data.find(
          (request) => request.senderEmail === user.email
        );

        // const existingEmail =
        console.log(user.email, findRequest.senderEmail);

        if (findRequest && findRequest2) {
          setRequestSent(true);
          return axiosInstance
            .get(`/partners-request?partnerId=${findRequest.partnerId}`)
            .then((data) => setConnectionsPartner(data.data));
        }
      })
      .catch(() => {
        console.error("Error fetching partner data");
        setLoading(false);
      });
  }, [id, user, navigate, axiosInstance, setPartner]);

  // Handle Send Partner Request
  const handleSendRequest = () => {
    const newRequest = {
      partnerId: id,
      receiverEmail: partner.email,
      receiverName: partner.name,
      receiverProfileimage: partner.profileimage,
      receiverSubject: partner.subject,
      receiverstudyMode: partner.studyMode,
      senderEmail: user.email,
      senderName: user.displayName,
      senderProfileimage: user.photoURL,
    };

    axiosInstance
      .post(`/partners-request`, newRequest)
      .then((data) => {
        // if (data.data.insertedId) {
          toast.success("Request sended Successful..!");
          setRequestSent(true);
          newRequest._id = data.data.insertedId;
          setConnectionsPartner([...connectionsPartner, newRequest]);
        // }
        return axiosInstance.patch(`/partners/${id}/increase`);
      })
      .then(() => {
        setPartner((prev) => ({
          ...prev,
          partnerCount: prev.partnerCount + 1,
        }));
        toast.success("Partner count increased successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "Something went wrong while sending request or updating count"
        );
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-dots loading-xl"></span>
        <span className="loading loading-dots loading-xl"></span>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  if (!partner)
    return <div className="text-center mt-10">Partner not found!</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 mt-14">
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6">
        {/* Left Column: Profile Image */}
        <div className="flex justify-center md:justify-start">
          <img
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-gradient-to-r from-[#632EE3] to-[#9F62F2] object-cover"
            src={partner?.profileImage}
            alt={partner?.name}
          />
        </div>

        {/* Right Column: Partner Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-[#445ce6]">{partner.name}</h1>

          <div className="flex items-center gap-2">
            {[...Array(Math.round(partner.rating))].map((_, i) => (
              <ImStarFull key={i} className="text-yellow-400" />
            ))}
            <span className="text-gray-700">
              {partner.rating === 0 ? "Rating 0" : partner.rating}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              {partner.subject}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {/* <span className="w-0.5 bg-green-600 rounded-full px-0.5"></span> */}
              {partner.studyMode}
            </span>
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
              <small>Experience:</small> Medium {partner.studyMode}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <small>Partner Connections :</small> {partner.partnerCount === 0 || partner.partnerCount === undefined ? 0 : partner.partnerCount}
            </span>
          </div>

          <div className="text-[#131313] font-light">
            <p>Availability: {partner.availabilityTime}</p>
            <p>Location: {partner.location}</p>
          </div>

          <button
            onClick={handleSendRequest}
            disabled={requestSent}
            className={`mt-4 py-2 px-6 rounded-lg text-white font-semibold shadow transition-all
              ${
                requestSent
                  ? "bg-gray-400 cursor-not-allowed"
                  : "primary-btn hover:shadow-lg cursor-pointer"
              }`}
          >
            {requestSent ? "Request Sent" : "Send Partner Request"}
          </button>
        </div>
      </div>
      <div className="">
        {
            connectionsPartner.length === 0 ?
            <div className="border py-10 border-gray-500 rounded-xl">
            <p className="text-xl text-center text-gray-500">
                Partner Connections Empty
            </p>
            </div>
            :
            <div className="">
            <h3 className="text-2xl font-medium mb-3 underline text-center">
                Connections
            </h3>
            {connectionsPartner?.map((connection, index) => (
                <div key={connection._id} className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>{index + 1}</th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                src={connection?.senderProfileimage}
                                alt={connection?.senderName}
                                />
                            </div>
                            </div>
                        </div>
                        </td>
                        <td>{connection?.senderName}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            ))}
            </div>
        }
      </div>
    </div>
  );
};

export default PartnerDetails;
