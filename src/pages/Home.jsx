import React from "react";
import Banner from "../components/Banner";
import TopStudyPartners from "../components/TopStudyPartners";
import ExtraSections from "../components/ExtraSections";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Banner />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <TopStudyPartners />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <ExtraSections />
      </motion.div>
    </div>
  );
};

export default Home;
