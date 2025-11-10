import React from "react";
import { FaStar } from "react-icons/fa";

const Partner = ({partner}) => {
  console.log(partner);
  
  return (
    <div className="rounded-4xl">
      <div className="card bg-base-100 w-full shadow-2xl">
        <figure className="relative py-10">
          <img
            src={`${partner?.profileimage}`}
            // src="https://i.ibb.co/b5NH6pYG/photo-1535713875002-d1d0cf377fde.jpg"
            alt="user"
            className="h-full w-[50%] rounded-full "
          />
          <div className="bg-green-500 p-1 font-bold text-[12px] top-1 right-1 absolute rounded-full">Top</div>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[min(5vh,24px)] font-bold text-primary flex justify-between ">
            {partner.name}
            <div className="badge badge-accent">
              <FaStar
                color="yellow"
              /> {partner.rating}
            </div>
          </h2>
          <p>
            <div className="flex">
              <p className="border-b border-gray-500 text-gray-400 w-[47%] text-[min(3vh,12px)]">Subject:</p>
              <p className=" w-[6%]"></p>
              <p className="border-b border-gray-500 text-gray-400 w-[47%] text-[min(3vh,12px)]">Skill:</p>
            </div>
            <div className="flex">
              <p className="w-[47%] font-semibold text-[min(4vh,20px)]">{partner.subject}</p>
              <p className=" w-[6%]"></p>
              <p className="w-[47%] font-semibold text-[min(4vh,20px)]">{partner.experienceLevel}</p>
            </div>
          </p>
          {/* <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div> */}
        </div>
        <div className="">
            <button className="primary-btn btn w-full">View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Partner;
