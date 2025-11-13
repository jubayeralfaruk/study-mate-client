// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Partner from "./Partner";

const TopStudyPartners = () => {
  const [partners, setPartners] = useState([]);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/topPartners")
      .then((data) => {
        setPartners(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance]);

  return (
    <div className="mx-auto my-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Top Study Partners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {loading ? (
          <div className="flex justify-center items-center min-h-[20vh] col-span-full">
            <span className="loading loading-dots loading-xl"></span>
            <span className="loading loading-dots loading-xl"></span>
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : (
          partners.map((partner) => (
            <Partner key={partner._id} partner={partner}></Partner>
          ))
        )}
      </div>
    </div>
  );
};

export default TopStudyPartners;
