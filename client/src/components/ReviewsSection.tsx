import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Review } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (reviews.length === 0) return null;

  // Duplicate only once for seamless loop
  const duplicated = [...reviews, ...reviews];

  return (
    <section className="py-12 sm:py-16 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Customer Reviews
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what people are saying about Meddy's Africana Buka
          </p>
        </div>

        {/* Desktop: CSS marquee | Mobile: horizontal snap scroll */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory md:snap-none">
            <div className="
              flex gap-6
              md:animate-marquee                  /* Desktop infinite scroll */
              [animation-play-state:running]      /* Always run on desktop */
              md:hover:[animation-play-state:paused] /* Pause on hover */
            ">
              {duplicated.map((review, index) => (
                <Card
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 snap-start w-[300px] sm:w-[360px] p-5 bg-card border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {review.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground text-sm">
                        {review.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-card-foreground leading-relaxed line-clamp-4">
                    "{review.comment}"
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
