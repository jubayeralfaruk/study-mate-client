import React, { use, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../contexts/AuthContext";
import Partner from "../components/Partner";

const FindPartners = () => {
  const axiosInstance = useAxios();
  const { user } = use(AuthContext);
  const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(false)

  useEffect(() => {
    axiosInstance.get("/partners").then((data) => {
      const filterPartner = data.data.filter(
        (partner) => partner?.email !== user?.email
      );
      setPartners(filterPartner);
    });
  }, [axiosInstance, setPartners, user]);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">
        All Partners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {partners.map((partner,index) => (
          <Partner key={index} partner={partner}></Partner>
        ))}
      </div>
    </div>
  );
};

export default FindPartners;
