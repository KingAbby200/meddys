import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Review } from "@shared/schema";
import { useEffect, useRef } from "react";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    if (scrollWidth <= clientWidth) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.9;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [reviews]);

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-12 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who love our authentic African cuisine
          </p>
        </div>

        <div
          ref={scrollRef}
          className="overflow-hidden"
          style={{ scrollBehavior: "auto" }}
        >
          <div className="flex space-x-6" style={{ width: "max-content" }}>
            {duplicatedReviews.map((review, index) => (
              <Card
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-[300px] sm:w-[350px] p-6 bg-card hover-elevate"
                data-testid={`review-card-${index}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {review.customerName.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-card-foreground">
                  {review.customerName}
                </p>
                <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 mb-3"> 
                    <p className="text-card-foreground mb-4 text-sm leading-relaxed">
                      "{review.comment}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
