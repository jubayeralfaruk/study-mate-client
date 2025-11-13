import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Partner = ({partner}) => {  
  return (
    <div className="rounded-4xl">
      <div className="card bg-base-100 w-full shadow-2xl flex flex-col h-full">
        <figure className="relative py-10">
          <img
            src={partner?.profileImage || "https://i.ibb.co/b5NH6pYG/photo-1535713875002-d1d0cf377fde.jpg"}
            alt="user"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-gradient-to-r from-[#632EE3] to-[#9F62F2] object-cover"
          />
          {
            partner.rating >= 4.45
          }
        </figure>
        <div className="card-body flex flex-col mt-auto">
          <h2 className="card-title text-[min(5vh,24px)] font-bold text-primary flex justify-between ">
            {partner.name}
            <div className="badge badge-accent">
              <FaStar
                className="text-yellow-400 fill-yellow-400"
              /> {partner.rating}
            </div>
          </h2>
          <div className="mt-auto flex flex-col">
            <div className="flex mt-auto">
              <p className="border-b border-gray-500 text-gray-400 w-[47%] text-[min(3vh,12px)]">Subject:</p>
              <p className=" w-[6%]"></p>
              <p className="border-b border-gray-500 text-gray-400 w-[47%] text-[min(3vh,12px)]">Skill:</p>
            </div>
            <div className="flex mt-auto">
              <p className="w-[47%] font-semibold text-[min(4vh,20px)]">{partner.subject}</p>
              <p className=" w-[6%]"></p>
              <p className="w-[47%] font-semibold text-[min(4vh,20px)]">{partner.experienceLevel}</p>
            </div>
          </div>
        </div>
        <div className="mt-auto">
            <Link to={`/partners/${partner._id}`} className="primary-btn btn w-full">View Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Partner;
