import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ExtraSections = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
      {/* ✅ How It Works Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          How It <span className="text-indigo-600">Works</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Create Your Profile",
              desc: "Sign up and set your study preferences, subjects, and availability.",
              icon: "👤",
            },
            {
              title: "Find Partners",
              desc: "Browse and connect with learners who share your goals and subjects.",
              icon: "🔍",
            },
            {
              title: "Collaborate & Learn",
              desc: "Start studying together, share resources, and track your progress.",
              icon: "📚",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Testimonials / Review Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          What Our Users <span className="text-indigo-600">Say</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Aisha Rahman",
              review:
                "StudyMate helped me find a perfect partner for my physics prep. We motivate each other every day!",
              rating: 5,
              image:
                "https://i.ibb.co/3TkD6Bq/user1.jpg",
            },
            {
              name: "Rafiul Karim",
              review:
                "The platform is so easy to use and the connection process is super smooth!",
              rating: 4,
              image:
                "https://i.ibb.co/LpK1RJR/user2.jpg",
            },
            {
              name: "Nusrat Jahan",
              review:
                "Loved the matching system! Found a study partner who shares the same learning style.",
              rating: 5,
              image:
                "https://i.ibb.co/fSmkzdp/user3.jpg",
            },
          ].map((user, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-2xl shadow hover:shadow-lg bg-white transition"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <div className="flex justify-center my-2">
                {Array.from({ length: user.rating }).map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">{user.review}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
