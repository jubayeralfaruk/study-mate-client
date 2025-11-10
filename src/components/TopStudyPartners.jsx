// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Partner from "./Partner";

const TopStudyPartners = () => {
  const [partners, setPartners] = useState([])
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get('/topPartners')
      .then(data => setPartners(data.data))  
      .catch(err => console.error(err));
  }, [axiosInstance])

  return (
    <div className="mx-auto my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Top Study Partners</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          partners.map((partner) => (<Partner partner={partner}></Partner>))
        }
      </div>
    </div>
  );
};

export default TopStudyPartners;
