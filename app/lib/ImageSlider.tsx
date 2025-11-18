'use client';
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      url: "/fido-Fig.png",
      title: "Biometric Security",
      subtitle: "Advanced fingerprint & face recognition"
    },
    {
      url: "/fido-Fig-2.png",
      title: "WebAuthn Login",
      subtitle: "Industry-standard authentication"
    },
    {
      url: "/fido-Fig-3.png",
      title: "FIDO2 Protected",
      subtitle: "Military-grade encryption"
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered]);

  return (
    <div 
      className="relative w-full h-[200px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-3xl shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
          <Image
            src={slide.url}
            alt={slide.title}
            fill
            className="object-fill"
            priority={index === 0}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="transform transition-all duration-500 ease-out">
          <h2 className="text-md sm:text-3xl lg:text-4xl font-bold text-white  tracking-tight">
            {slides[currentIndex].title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-medium">
            {slides[currentIndex].subtitle}
          </p>
        </div>

        {/* Progress Bar */}
        {/* <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ 
              width: `${((currentIndex + 1) / slides.length) * 100}%`,
            }}
          />
        </div> */}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/25 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/25 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-1 pt-1 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentIndex
                ? "w-8 sm:w-10 h-2 bg-white shadow-lg shadow-white/50"
                : "w-2 h-2 bg-white/40 hover:bg-white/70 hover:scale-125"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      {/* <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
        <span className="text-xs sm:text-sm font-semibold text-white">
          {currentIndex + 1} / {slides.length}
        </span>
      </div> */}
    </div>
  );
}