import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-xl mb-4">Meddy's Africana Buka</h3>
            <p className="text-background/80 text-sm">
              Authentic African cuisine and intercontinental delicacies, served with love.
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Our Locations</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <span className="text-sm text-background/80">Egbeda, Lagos</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <span className="text-sm text-background/80">Cement Bus Stop, Lagos</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <span className="text-sm text-background/80">Baruwa, Lagos</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm text-background/80">+234 801 234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm text-background/80">info@meddysbuka.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} Meddy's Africana Buka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
