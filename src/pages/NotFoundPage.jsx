import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2A66F4] to-[#26E3FF] text-white text-center px-6">
      {/* Animated 404 Text */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-9xl font-extrabold mb-4"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-2xl md:text-3xl font-semibold mb-6"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.h2>

      {/* Floating animation of illustration or emoji */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-6xl mb-8"
      >
        🚀
      </motion.div>

      {/* Back Home Button */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Link
          to="/"
          className="bg-white text-[#2A66F4] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-100 transition"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
