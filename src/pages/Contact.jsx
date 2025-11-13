import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen rounded-2xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        Contact<span className="p-0 text-primary"> Us</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-xl mb-10 text-gray-600 dark:text-gray-300"
      >
        Have questions, feedback, or collaboration ideas?  
        We’d love to hear from you! Reach out using the form below.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-[#9F62F2] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-[#9F62F2] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-[#9F62F2] outline-none resize-none"
            required
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full py-2 font-semibold text-white rounded-lg primary-btn shadow-md hover:opacity-90 transition"
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Contact Info */}
      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#26E3FF]" /> support@studymate.com
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#26E3FF]" /> +880 123 456 789
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#26E3FF]" /> Dhaka, Bangladesh
        </div>
      </div>
    </div>
  );
};

export default Contact;
