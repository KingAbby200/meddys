// client/src/components/ReviewsSection.tsx
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Review } from "@shared/schema";
import { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only animate when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (scrollRef.current) observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-scroll only on desktop OR when visible
  useEffect(() => {
    if (!isVisible || reviews.length === 0) return;

    // DISABLE ON MOBILE (width < 768px)
    if (window.innerWidth < 768) return;

    const container = scrollRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth / 2;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position += speed;
      if (position >= scrollWidth) position = 0;
      container.scrollLeft = position;
      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);

    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [isVisible, reviews]);

  const duplicated = [...reviews, ...reviews];

  return (
    <section className="py-12 sm:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Customer Reviews
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what people are saying about Meddy's Africana Buka
          </p>
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: "auto" }}
        >
          <div className="flex gap-6" style={{ width: "max-content" }}>
            {duplicated.map((review, index) => (
              <Card
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-[300px] sm:w-[360px] p-5 bg-card border shadow-sm hover:shadow-md transition-shadow"
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
                      className={`w-4 h-4 ${
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
    </section>
  );
}
