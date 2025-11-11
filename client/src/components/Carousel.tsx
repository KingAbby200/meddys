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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
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

      {/* ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← */}
      {/* NEW: "View all" Button – Top Right */}
      <Link href="/menu">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 
                     bg-white/90 hover:bg-white 
                     text-black font-medium 
                     backdrop-blur-md shadow-md 
                     px-4 py-2 rounded-full 
                     text-sm sm:text-base"
          data-testid="button-view-all-menu"
        >
          View all
        </Button>
      </Link>
      {/* ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← */}

      <Button
        variant="ghost"
        size="lg"
        className="absolute left-4 bottom-40 md:bottom-48 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground backdrop-blur-md h-10 w-10 shadow-lg"
        onClick={goToPrevious}
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="absolute right-4 bottom-40 md:bottom-48 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground backdrop-blur-md h-10 w-10 shadow-lg"
        onClick={goToNext}
        data-testid="button-carousel-next"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-accent w-8"
                : "bg-background/50 hover:bg-background/80"
            }`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
