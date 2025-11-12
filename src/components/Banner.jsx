import React from "react";

const Banner = () => {
  return (
    <div className="w-full mt-10">
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl">
        {/* === SLIDE CONTAINER === */}
        <div className="w-full h-full carousel-container">
          {/* Slide 1 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/r2r2wTYZ/Gemini-Generated-Image-2masyo2masyo2mas.png"
              className="w-full h-full object-cover"
              alt="Slide 1"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Your Smart Study Partner —{" "}
                <span className="text-primary">Study Mate</span>
              </h2>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/C5k0n9LK/back-to-school-still-life-flat-lay-on-yellow-background-with-school-supplies-photo.jpg"
              className="w-full h-full object-cover"
              alt="Slide 2"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Personalized Learning for Faster Progress
              </h2>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/jPwKpXhQ/pexels-cottonbro-4778611.jpg"
              className="w-full h-full object-cover"
              alt="Slide 3"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Practice Tools to Improve Your Skills
              </h2>
            </div>
          </div>
          {/* Slide 4 */}
          <div className="slide">
            <img
              src="https://i.ibb.co/21xn1dQ2/homepage-banner.jpg"
              className="w-full h-full object-cover"
              alt="Slide 3"
            />
            <div className="absolute inset-0 w-full bg-black/40 flex items-center justify-center text-center">
              {/* <div className="grid grid-cols-8"> */}
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Meet, chat, and study with students from all over the world 🌎
                </h2>
                {/* <p className="col-span-3"></p> */}
              {/* </div> */}
            </div>
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
          animation: fadeSlide 12s infinite;
        }

        .slide:nth-child(1) { animation-delay: 0s; }
        .slide:nth-child(2) { animation-delay: 4s; }
        .slide:nth-child(3) { animation-delay: 8s; }
        .slide:nth-child(4) { animation-delay: 12s; }

        @keyframes fadeSlide {
          0% { opacity: 0; }
          8% { opacity: 1; }
          30% { opacity: 1; }
          38% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Banner;
