import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

import { initialSlides, CarouselSlide } from "../../data/carouselData";

const CarouselHero: React.FC = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>(initialSlides.filter(s => s.isActive !== false));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const savedSlides = localStorage.getItem("carouselSlides");
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides).filter((s: CarouselSlide) => s.isActive !== false));
    }
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    // Pause auto-advance if it's a video to let it play to completion
    if (slides[currentIndex].type === "video") return;

    const timer = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(timer);
  }, [currentIndex, slides]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden bg-slate-900 group">
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {slides[currentIndex].type === "image" ? (
              <div className="relative w-full h-full">
                <img
                  src={slides[currentIndex].url}
                  alt={slides[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-full h-full bg-black">
                {/* Blurred Background Video */}
                <video
                  src={slides[currentIndex].url}
                  autoPlay
                  playsInline
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110"
                />
                
                {/* Main Foreground Video (Uncropped) */}
                <video
                  src={slides[currentIndex].url}
                  autoPlay
                  playsInline
                  onEnded={nextSlide}
                  className="relative z-10 w-full h-full object-contain xl:object-cover"
                />
                {/* Remove the dark overlay so the video is fully visible */}
              </div>
            )}

            {/* Content Overlay - Hidden for Videos */}
            {slides[currentIndex].type !== "video" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 ${
                    slides[currentIndex].id === 1 || slides[currentIndex].id === 2
                      ? "text-white drop-shadow-lg"
                      : "text-orange-600  drop-shadow-md"
                  }`}
                >
                  {slides[currentIndex].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className={`text-base sm:text-lg md:text-2xl max-w-2xl ${
                    slides[currentIndex].id === 1 || slides[currentIndex].id === 2
                      ? "text-white/90 drop-shadow-md"
                      : "text-orange-800 font-medium drop-shadow-sm"
                  }`}
                >
                  {slides[currentIndex].description}
                </motion.p>

                {/* Action Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-8"
                >
                  <Link
                    to="/rdv"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-lg transition-all transform hover:scale-105 shadow-xl"
                  >
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    Prendre Rendez-vous
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Social Links (Optional but nice to keep consistent) */}
      <div className="absolute bottom-6 left-6 z-30 hidden md:flex items-center gap-4 text-white font-semibold flex-wrap z-50">
         <span className="text-sm tracking-widest uppercase">Suivez-nous</span>
         <div className="w-12 h-px bg-white/50" />
         <a href="https://www.facebook.com/cliniclife8/?locale=fr_FR" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition-colors pointer-events-auto">
            Facebook
         </a>
      </div>
    </div>
  );
};

export default CarouselHero;
