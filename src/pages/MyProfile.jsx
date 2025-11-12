import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyProfile = () => {
  const {user} = use(AuthContext)

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="shadow-2xl rounded-xl p-6 flex flex-col items-center w-80">
        <img
          src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"}
          alt={`${user?.displayName}'s profile photo`}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{user?.displayName}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default MyProfile;
