import React from "react";
import { Link } from "react-router";
import { ArrowRight, Play } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-xl">
        {/* === SLIDE CONTAINER === */}
        <div className="w-full h-full carousel-container">
          {/* Slide 1 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/r2r2wTYZ/Gemini-Generated-Image-2masyo2masyo2mas.png"
              className="w-full h-full object-cover"
              alt="Study Partners Collaboration"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Find Your Perfect{" "}
                  <span className="text-primary">Study Partner</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Connect with like-minded students, share knowledge, and achieve academic excellence together
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/findPartners" className="btn border-none primary-btn btn-lg">
                    Find Partners Now
                    <ArrowRight size={20} />
                  </Link>
                  <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                    <Play size={20} />
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/C5k0n9LK/back-to-school-still-life-flat-lay-on-yellow-background-with-school-supplies-photo.jpg"
              className="w-full h-full object-cover"
              alt="Study Materials"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Personalized Learning for{" "}
                  <span className="text-primary">Faster Progress</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  AI-powered matching system connects you with partners who complement your learning style
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register" className="btn primary-btn border-none btn-lg">
                    Get Started Free
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/about" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/jPwKpXhQ/pexels-cottonbro-4778611.jpg"
              className="w-full h-full object-cover"
              alt="Students Studying"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Practice Tools to{" "}
                  <span className="text-primary">Improve Skills</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Access collaborative study tools, share resources, and track your progress together
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/createPartnerProfile" className="btn primary-btn border-none btn-lg">
                    Create Profile
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/contact" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/21xn1dQ2/homepage-banner.jpg"
              className="w-full h-full object-cover"
              alt="Global Community"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Meet & Study with Students{" "}
                  <span className="text-primary">Worldwide</span> 🌎
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join a global community of learners and expand your knowledge beyond borders
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/findPartners" className="btn primary-btn border-none btn-lg">
                    Join Community
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/about" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                    Our Story
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* === CUSTOM CSS FOR AUTOPLAY === */}
      <style>{`
        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          animation: fadeSlide 16s infinite;
        }

        .slide:nth-child(1) { animation-delay: 0s; }
        .slide:nth-child(2) { animation-delay: 4s; }
        .slide:nth-child(3) { animation-delay: 8s; }
        .slide:nth-child(4) { animation-delay: 12s; }

        @keyframes fadeSlide {
          0% { opacity: 0; }
          6.25% { opacity: 1; }
          25% { opacity: 1; }
          31.25% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Banner;
