import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface CarouselImage {
  id: string;
  image: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

export function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl">
      {/* Image Container */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.image}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* "View all" Button – Top Right */}
      <Link href="/menu">
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-[300px] sm:-top-[400px] lg:-top-[500px] 
                     bg-white/90 hover:bg-white 
                     text-black font-medium 
                     backdrop-blur-md shadow-md 
                     px-4 py-2 rounded-full 
                     text-sm sm:text-base z-10"
          data-testid="button-view-all-menu"
        >
          View all
        </Button>
      </Link>

      <div className="flex flex-row justify-between top-1/2 -translate-y-1/2">
        {/* Prev Button */}
        <Button
          variant="ghost"
          size="lg"
          className="ml-4 top-1/2  
                     bg-white/90 hover:bg-white text-black 
                     backdrop-blur-md h-10 w-10 rounded-full shadow-lg z-10"
          onClick={goToPrevious}
          data-testid="button-carousel-prev"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
  
        {/* Next Button */}
        <Button
          variant="ghost"
          size="lg"
          className="mr-4 
                     bg-white/90 hover:bg-white text-black 
                     backdrop-blur-md h-10 w-10 rounded-full shadow-lg z-10"
          onClick={goToNext}
          data-testid="button-carousel-next"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots – Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
