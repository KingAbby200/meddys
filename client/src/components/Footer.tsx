import { MapPin, Phone, Mail, Facebook, Instagram, Music2 } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      name: "TikTok",
      href: "https://tiktok.com/@meddysbuka",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.58 6.52c-.61-.9-1.62-1.52-2.75-1.52-.05 0-.1.01-.15.02v3.08c.05-.01.1-.02.15-.02 1.13 0 2.14.62 2.75 1.52v6.9c0 3.73-3.03 6.76-6.76 6.76s-6.76-3.03-6.76-6.76 3.03-6.76 6.76-6.76c.36 0 .71.03 1.05.08v3.43c-.34-.05-.69-.08-1.05-.08-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-7.65c1.3.97 2.86 1.54 4.56 1.54v-3.43c-1.7 0-3.26-.57-4.56-1.54v7.65c0 3.73-3.03 6.76-6.76 6.76s-6.76-3.03-6.76-6.76 3.03-6.76 6.76-6.76v3.43z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/bukaafricana",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/meddysbuka",
      icon: <Instagram className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="bg-foreground text-background py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-poppins font-bold text-xl mb-4">Meddy's Africana Buka</h3>
            <p className="text-background/80 text-sm">
              Authentic African cuisine and intercontinental delicacies, served with love.
            </p>
          </div>

          {/* Locations */}
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

          {/* Contact + Social */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Contact & Follow</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm text-background/80">+234 801 234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm text-background/80">info@meddysbuka.com</span>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:text-accent transition-colors duration-200 hover:scale-110"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} Meddy's Africana Buka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
