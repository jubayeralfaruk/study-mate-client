import React from "react";
import { motion } from "framer-motion";
import { 
  Star, 
  Users, 
  BookOpen, 
  Globe, 
  Award, 
  TrendingUp,
  MessageCircle,
  Clock,
  CheckCircle,
  Mail,
  ArrowRight,
  Target,
  Zap,
  Shield
} from "lucide-react";

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
              icon: <Users size={48} className="text-primary mx-auto mb-4" />,
            },
            {
              title: "Find Partners",
              desc: "Browse and connect with learners who share your goals and subjects.",
              icon: <BookOpen size={48} className="text-primary mx-auto mb-4" />,
            },
            {
              title: "Collaborate & Learn",
              desc: "Start studying together, share resources, and track your progress.",
              icon: <Target size={48} className="text-primary mx-auto mb-4" />,
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-2xl shadow hover:shadow-lg transition bg-base-100">
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-base-content/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Why Choose <span className="p-0 text-primary">StudyMate</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Smart Matching",
              desc: "AI-powered algorithm matches you with compatible study partners",
              icon: <Zap size={32} className="text-primary" />,
            },
            {
              title: "Secure Platform",
              desc: "Safe and secure environment for all your study interactions",
              icon: <Shield size={32} className="text-primary" />,
            },
            {
              title: "Global Community",
              desc: "Connect with students from universities worldwide",
              icon: <Globe size={32} className="text-primary" />,
            },
            {
              title: "24/7 Support",
              desc: "Round-the-clock assistance for all your queries",
              icon: <Clock size={32} className="text-primary" />,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition bg-base-100">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-base-content/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Study Categories Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Popular Study <span className="p-0 text-primary">Categories</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Computer Science", count: "1,234", icon: "💻" },
            { name: "Mathematics", count: "987", icon: "📊" },
            { name: "Physics", count: "756", icon: "⚛️" },
            { name: "Chemistry", count: "654", icon: "🧪" },
            { name: "Biology", count: "543", icon: "🧬" },
            { name: "Literature", count: "432", icon: "📚" },
          ].map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-base-100 cursor-pointer">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-sm">{category.name}</h3>
              <p className="text-xs text-base-content/70">{category.count} partners</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-primary text-primary-content rounded-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            StudyMate by the Numbers
          </h2>
          <p className="text-primary-content/80">Join thousands of successful students</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10,000+", label: "Active Students", icon: <Users size={32} /> },
            { number: "50,000+", label: "Study Sessions", icon: <BookOpen size={32} /> },
            { number: "95%", label: "Success Rate", icon: <TrendingUp size={32} /> },
            { number: "4.8/5", label: "User Rating", icon: <Star size={32} /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
              <div className="text-sm text-primary-content/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          What Our Users <span className="p-0 text-primary">Say</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Aisha Rahman",
              review:
                "StudyMate helped me find a perfect partner for my physics prep. We motivate each other every day!",
              rating: 5,
              subject: "Physics",
              image:
                "https://i.ibb.co/N6C1d976/ayo-ogunseinde-6-W4-F62s-N-y-I-unsplash.jpg",
            },
            {
              name: "Rafiul Karim",
              review:
                "The platform is so easy to use and the connection process is super smooth!",
              rating: 4,
              subject: "Computer Science",
              image:
                "https://i.ibb.co/SwMHzbcH/wellington-ferreira-72-TE8c-WKXRY-unsplash.jpg",
            },
            {
              name: "Nusrat Jahan",
              review:
                "Loved the matching system! Found a study partner who shares the same learning style.",
              rating: 5,
              subject: "Mathematics",
              image:
                "https://i.ibb.co/mVRSkVQ6/christopher-campbell-r-DEOVt-E7v-Os-unsplash.jpg",
            },
          ].map((user, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-2xl shadow hover:shadow-lg bg-base-100 transition">
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{user.name}</h3>
              <p className="text-sm text-primary mb-2">{user.subject}</p>
              <div className="flex justify-center mb-3">
                {Array.from({ length: user.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 w-4 h-4 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-base-content/70">{user.review}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="p-0 text-primary">Questions</span>
          </h2>
          <p className="text-base-content/70">Everything you need to know about StudyMate</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: "How does the matching system work?",
              answer: "Our AI algorithm matches you based on study subjects, experience level, availability, and learning preferences."
            },
            {
              question: "Is StudyMate free to use?",
              answer: "Yes! StudyMate is completely free for students. We believe education should be accessible to everyone."
            },
            {
              question: "Can I study with multiple partners?",
              answer: "Absolutely! You can connect with multiple study partners across different subjects and form study groups."
            },
            {
              question: "How do I ensure my safety on the platform?",
              answer: "We have strict verification processes, reporting systems, and community guidelines to ensure a safe learning environment."
            }
          ].map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-100 shadow">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-base-200 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Updated with <span className="p-0 text-primary">StudyMate</span>
        </h2>
        <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
          Get the latest study tips, partner matching updates, and educational resources delivered to your inbox.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered flex-1"
          />
          <button className="btn btn-primary">
            <Mail size={16} />
            Subscribe
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Perfect Study Partner?
        </h2>
        <p className="text-primary-content/90 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have already improved their grades and made lasting friendships through StudyMate.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-lg bg-white text-primary hover:bg-base-100">
            Get Started Free
            <ArrowRight size={20} />
          </button>
          <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
