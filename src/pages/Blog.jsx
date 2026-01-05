import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Lightbulb } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Effective Study Techniques That Actually Work",
      excerpt: "Discover proven study methods that can help you retain information better and improve your academic performance.",
      author: "Dr. Sarah Ahmed",
      date: "January 3, 2026",
      category: "Study Tips",
      image: "https://i.ibb.co/jPwKpXhQ/pexels-cottonbro-4778611.jpg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Find the Perfect Study Partner",
      excerpt: "Learn the key factors to consider when choosing a study partner and how to make the most of collaborative learning.",
      author: "Prof. Michael Chen",
      date: "December 28, 2025",
      category: "Partnership",
      image: "https://i.ibb.co/r2r2wTYZ/Gemini-Generated-Image-2masyo2masyo2mas.png",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Science Behind Collaborative Learning",
      excerpt: "Explore the research that shows why studying with others can significantly boost your learning outcomes.",
      author: "Dr. Emily Rodriguez",
      date: "December 25, 2025",
      category: "Research",
      image: "https://i.ibb.co/C5k0n9LK/back-to-school-still-life-flat-lay-on-yellow-background-with-school-supplies-photo.jpg",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Managing Study Groups Effectively",
      excerpt: "Tips and strategies for organizing productive study sessions with multiple partners.",
      author: "James Wilson",
      date: "December 20, 2025",
      category: "Group Study",
      image: "https://i.ibb.co/21xn1dQ2/homepage-banner.jpg",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Digital Tools for Modern Students",
      excerpt: "A comprehensive guide to the best apps and platforms that can enhance your study experience.",
      author: "Tech Team",
      date: "December 15, 2025",
      category: "Technology",
      image: "https://i.ibb.co/jPwKpXhQ/pexels-cottonbro-4778611.jpg",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "Overcoming Study Burnout",
      excerpt: "Recognize the signs of burnout and learn practical strategies to maintain motivation and mental health.",
      author: "Dr. Lisa Park",
      date: "December 10, 2025",
      category: "Wellness",
      image: "https://i.ibb.co/r2r2wTYZ/Gemini-Generated-Image-2masyo2masyo2mas.png",
      readTime: "9 min read"
    }
  ];

  const categories = ["All", "Study Tips", "Partnership", "Research", "Group Study", "Technology", "Wellness"];

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          StudyMate <span className="text-primary">Blog</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-base-content/70 max-w-2xl mx-auto"
        >
          Insights, tips, and resources to help you succeed in your academic journey
        </motion.p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`btn btn-sm ${index === 0 ? 'btn-primary' : 'btn-outline'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card lg:card-side bg-base-100 shadow-lg"
      >
        <figure className="lg:w-1/2">
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full h-64 lg:h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
            <span className="badge badge-primary">{blogPosts[0].category}</span>
            <span>•</span>
            <span>{blogPosts[0].readTime}</span>
          </div>
          <h2 className="card-title text-2xl lg:text-3xl">{blogPosts[0].title}</h2>
          <p className="text-base-content/70 text-lg">{blogPosts[0].excerpt}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="text-sm">{blogPosts[0].author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">{blogPosts[0].date}</span>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">
              Read More
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <figure>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
                <span className="badge badge-outline">{post.category}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="card-title text-lg">{post.title}</h3>
              <p className="text-base-content/70 text-sm">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-primary">
                  Read More
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-primary text-primary-content shadow-lg"
      >
        <div className="card-body text-center">
          <h3 className="card-title text-2xl justify-center mb-4">
            Stay Updated with Our Latest Posts
          </h3>
          <p className="mb-6">
            Get weekly study tips, partnership advice, and educational insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1 text-base-content"
            />
            <button className="btn btn-secondary">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <BookOpen size={48} className="mx-auto text-primary mb-4" />
            <h3 className="card-title justify-center">Study Resources</h3>
            <p className="text-base-content/70">Access our comprehensive library of study materials and guides.</p>
            <div className="card-actions justify-center">
              <button className="btn btn-outline btn-sm">Explore</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <TrendingUp size={48} className="mx-auto text-primary mb-4" />
            <h3 className="card-title justify-center">Success Stories</h3>
            <p className="text-base-content/70">Read inspiring stories from students who found success through StudyMate.</p>
            <div className="card-actions justify-center">
              <button className="btn btn-outline btn-sm">Read Stories</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <Lightbulb size={48} className="mx-auto text-primary mb-4" />
            <h3 className="card-title justify-center">Study Tips</h3>
            <p className="text-base-content/70">Discover proven techniques and strategies to improve your learning.</p>
            <div className="card-actions justify-center">
              <button className="btn btn-outline btn-sm">Get Tips</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;