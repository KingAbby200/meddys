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
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
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
          className="absolute -top-[280px] sm:-top-[380px] lg:-top-[480px] 
                     bg-primary text-primary-foreground hover:bg-primary 
                     text-background font-medium 
                     backdrop-blur-md shadow-md 
                     px-4 py-2 rounded-full ml-4
                     text-sm sm:text-base z-10"
          data-testid="button-view-all-menu"
        >
          View all
        </Button>
      </Link>

      <div className="relative flex flex-row justify-between -top-[150px] sm:-top-[200px] lg:-top-[250px]">
        {/* Prev Button */}
        <Button
          variant="ghost"
          size="lg"
          className="ml-4 
                     bottom-[80px] sm:bottom-[105px] lg:bottom-[130px]
                     bg-white/90 hover:bg-white text-black 
                     backdrop-blur-md p-4 rounded-full shadow-lg z-10"
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
                     bottom-[80px] sm:bottom-[105px] lg:bottom-[130px]
                     bg-white/90 hover:bg-white text-black 
                     backdrop-blur-md p-4 rounded-full shadow-lg z-10"
          onClick={goToNext}
          data-testid="button-carousel-next"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots – Bottom Center */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-orange-200 w-8"
                : "bg-orange-200/60 hover:bg-orange-200/80"
            }`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
