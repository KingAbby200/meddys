import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/Carousel";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ArrowRight, Utensils, Clock, MapPin } from "lucide-react";
import heroImage from "/hero/lobby.jpg";

interface HomePageProps {
  carouselImages: Array<{ id: string; image: string; alt: string }>;
  reviews: Array<{
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export default function HomePage({ carouselImages, reviews }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <section
        className="relative h-[80vh] sm:h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-background mb-6 leading-tight">
            Welcome to Meddy's Africana Buka
          </h1>
          <p className="text-lg sm:text-xl text-background/90 mb-8 max-w-2xl mx-auto">
            Experience the rich flavors of authentic African cuisine, intercontinental dishes, and freshly baked pastries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/menu">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary text-base sm:text-lg px-8 py-6"
                data-testid="button-view-menu"
              >
                View Our Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/order">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-background/10 border-background/30 text-background backdrop-blur-md hover:bg-background/20 text-base sm:text-lg px-8 py-6"
                data-testid="button-order-now"
              >
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Delicious Selections
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our mouth-watering dishes and fresh pastries
          </p>
          {/*<img src="/menu/african/Jollof_Rice.jpg" alt="test image" />*/}
        </div>
        <Carousel images={carouselImages} />
      </section>

      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Utensils className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Authentic Cuisine</h3>
              <p className="text-muted-foreground">
                Traditional African recipes prepared with love and care
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Fast Service</h3>
              <p className="text-muted-foreground">
                Quick preparation and delivery to satisfy your cravings
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Three Locations</h3>
              <p className="text-muted-foreground">
                Egbeda, Cement Bus Stop, and Baruwa - order from your nearest branch
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection reviews={reviews} />
    </div>
  );
}
