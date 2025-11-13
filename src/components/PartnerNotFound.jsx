import { motion } from "framer-motion";
import { Link } from "react-router";

const PartnerNotFound = () => {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-[#2A66F4] to-[#26E3FF]  text-white text-center px-6">
      {/* Animated Illustration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-7xl mb-6"
      >
        🧑‍🎓❓
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-3"
      >
        Partner Not Found!
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-blue-100 max-w-md mb-8"
      >
        We couldn’t find the study partner you’re looking for. 
        They might have been removed or never existed.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Link
          to="/"
          className="bg-white text-[#2A66F4]  font-bold px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-100 transition"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PartnerNotFound;
