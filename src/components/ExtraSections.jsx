import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ExtraSections = () => {
  return (
    <div className="mx-auto px-4 md:px-0 pb-16 space-y-20">
      {/* How It Works Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          How It <span className="p-0 text-primary">Works</span>
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

      {/* Review Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          What Our Users <span className="p-0 text-primary">Say</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Aisha Rahman",
              review:"StudyMate helped me find a perfect partner for my physics prep. We motivate each other every day!",
              rating: 5,
              image:"https://i.ibb.co/N6C1d976/ayo-ogunseinde-6-W4-F62s-N-y-I-unsplash.jpg",
            },
            {
              name: "Rafiul Karim",
              review:"The platform is so easy to use and the connection process is super smooth!",
              rating: 4,
              image:"https://i.ibb.co/SwMHzbcH/wellington-ferreira-72-TE8c-WKXRY-unsplash.jpg",
            },
            {
              name: "Nusrat Jahan",
              review:"Loved the matching system! Found a study partner who shares the same learning style.",
              rating: 5,
              image:"https://i.ibb.co/mVRSkVQ6/christopher-campbell-r-DEOVt-E7v-Os-unsplash.jpg",
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
                className="w-36 h-36 mx-auto md:w-44 md:h-44 rounded-full border-4 border-gradient-to-r from-[#632EE3] to-[#9F62F2] object-cover"
              />
              <h3 className="text-xl text-gray-400 font-semibold">{user.name}</h3>
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
