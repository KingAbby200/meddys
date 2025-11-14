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
    const scrollSpeed = 0.7;

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
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-card-foreground mb-4 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-card-foreground">
                    {review.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
