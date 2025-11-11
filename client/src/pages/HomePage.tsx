import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/Carousel";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ArrowRight, Utensils, Clock, MapPin, Phone, MessageCircle, MapPinIcon } from "lucide-react";
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
      {/* HERO SECTION – ZOOM ANIMATION */}
      <section
        className="relative h-[80vh] sm:h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Zooming Background */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight animate-fadeIn">
            Taste Africa in Every Bite
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeIn animation-delay-300">
            From sizzling jollof to golden pastries — every dish tells a story of flavor, family, and tradition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn animation-delay-600">
            <Link href="/menu">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-base sm:text-lg px-8 py-6">
                Explore Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/order">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-md hover:bg-white/20 text-base sm:text-lg px-8 py-6">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Delicious Selections
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our mouth-watering dishes and fresh pastries
          </p>
        </div>
        <Carousel images={carouselImages} />
      </section>

      {/* WHY US */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Authentic Cuisine</h3>
              <p className="text-muted-foreground">Traditional African recipes prepared with love</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Fast Service</h3>
              <p className="text-muted-foreground">Quick prep and delivery to satisfy your cravings</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Three Locations</h3>
              <p className="text-muted-foreground">Egbeda, Cement, Baruwa — order from your nearest</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Meddy's Africana Buka was born from a passion to share the soul of African cuisine with Lagos. 
                Founded in 2020, we blend tradition with innovation — serving jollof that sings, pastries that melt, and service that feels like family.
              </p>
              <p className="text-lg text-muted-foreground">
                Every dish is made fresh daily using local ingredients. From our kitchen to your table, we deliver not just food — but an experience.
              </p>
            </div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground mb-12">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <a href="tel:+2349012345678" className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Phone className="w-10 h-10 text-orange-600 mb-3" />
              <span className="font-semibold">Call Us</span>
              <span className="text-sm text-muted-foreground">+234 901 234 5678</span>
            </a>
            <a href="https://wa.me/2349012345678" className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <MessageCircle className="w-10 h-10 text-green-600 mb-3" />
              <span className="font-semibold">WhatsApp</span>
              <span className="text-sm text-muted-foreground">Chat with us</span>
            </a>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <MapPinIcon className="w-10 h-10 text-orange-600 mb-3" />
              <span className="font-semibold">Visit Us</span>
              <span className="text-sm text-muted-foreground text-center">
                Egbeda | Cement | Baruwa
              </span>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection reviews={reviews} />
    </div>
  );
}
