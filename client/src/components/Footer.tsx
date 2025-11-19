import { MapPin, Phone, Mail, Facebook, Instagram, Music2 } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      name: "TikTok",
      href: "https://tiktok.com/@meddysbuka",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> 
            <title>tiktok</title> 
            <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z">
            </path> 
          </g>
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
                <span className="text-sm text-background/80">+2349136743651</span>
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
