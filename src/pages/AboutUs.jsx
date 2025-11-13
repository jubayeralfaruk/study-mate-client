import React from "react";
import { motion } from "framer-motion";
import { Users, Target, BookOpen } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        About Study<span className="p-0 text-primary">Mate</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-2xl mb-12 text-gray-600 dark:text-gray-300"
      >
        StudyMate is a MERN Stack-based platform designed to help students
        connect, collaborate, and grow together through shared learning goals.
      </motion.p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
        {/* Mission */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 flex flex-col items-center text-center"
        >
          <Target className="w-10 h-10 text-[#26E3FF] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Empower learners to find their perfect study partners, stay
            motivated, and achieve academic success together.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 flex flex-col items-center text-center"
        >
          <BookOpen className="w-10 h-10 text-[#26E3FF] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            To build a global learning network where students support and grow
            with one another through collaboration and shared knowledge.
          </p>
        </motion.div>

        {/* Community */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 flex flex-col items-center text-center"
        >
          <Users className="w-10 h-10 text-[#26E3FF] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Community</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We believe in the power of teamwork and create opportunities for
            students to collaborate beyond borders and backgrounds.
          </p>
        </motion.div>
      </div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-gray-600 dark:text-gray-400 max-w-2xl"
      >
        Join StudyMate today and take the next step in your academic journey —
        together we learn, together we grow 🌱
      </motion.p>
    </div>
  );
};

export default AboutUs;
