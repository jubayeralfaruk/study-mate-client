import React, { use, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../contexts/AuthContext";
import Partner from "../components/Partner";
import { motion } from "framer-motion";

const FindPartners = () => {
  const axiosInstance = useAxios();
  const { user } = use(AuthContext);
  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!search) {
      axiosInstance.get("/partners").then((data) => {
        const filterPartner = data.data.filter(
          (partner) => partner?.email !== user?.email
        );
        setLoading(false);
        setPartners(filterPartner);
      });
      return;
    }

    if (search) {
      axiosInstance
        .get(`/partners?subject=${search}`)
        .then((data) => {
          setPartners(data.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [axiosInstance, setPartners, user, search]);

  const handleBySort = (sort) => {
    setLoading(true);
    axiosInstance
      .get(`/partners?level=${sort}`)
      .then((data) => {
        setPartners(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Find <span className="p-0 text-primary">Partners</span>
      </motion.h2>
      <div className="flex justify-between mb-10">
        {/* <h4 className="text-xl">Total Partners: ({partners.length})</h4> */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          {/* Search */}
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              required
              placeholder="Search"
            />
          </label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          {/* sort */}
          <select
            defaultValue="Pick a color"
            className="select appearance-none"
            onChange={(e) => handleBySort(e.target.value)}
          >
            <option disabled={true}>Sort by Experience</option>
            <option value="Expert">Expert</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </select>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh] col-span-full">
            <span className="loading loading-dots loading-xl"></span>
            <span className="loading loading-dots loading-xl"></span>
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : (
          partners.map((partner, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Partner key={index} partner={partner}></Partner>
          </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindPartners;
