/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SparkItem {
  id: string | number;
  thumbnail: string;
  title: string;
  level: string;
  price: number;
  instructor: {
    name: string;
    avatar: string;
  };
}

export interface SparksCarouselProps {
  title: string;
  subtitle: string;
  items: SparkItem[];
}

export const SparksCarousel = React.forwardRef<
  HTMLDivElement,
  SparksCarouselProps
>(({ title, subtitle, items }, ref) => {
  const controls = useAnimation();
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll by 80% of the visible width
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  // Effect to check scroll position and update button states
  React.useEffect(() => {
    const checkScrollPosition = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(scrollLeft < 10);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
      }
    };

    const currentRef = carouselRef.current;
    if (currentRef) {
      // Initial check
      checkScrollPosition();
      currentRef.addEventListener("scroll", checkScrollPosition);
    }

    // Check again on window resize
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [items]);

  return (
    <section ref={ref} className="w-full py-8" aria-labelledby="sparks-title">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <a href="#" className="group inline-flex items-center">
              <h2
                id="sparks-title"
                className="text-2xl md:text-3xl font-bold tracking-tight text-[#007bff]"
              >
                {title}
              </h2>
              <ChevronRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1 text-[#007bff]" />
            </a>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Fade mask left-right (super modern look) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-background to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-background to-transparent z-10"></div>

          <div
            ref={carouselRef}
            className="flex w-full space-x-6 overflow-x-scroll pb-4 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="group w-[260px] shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <div className="overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                  <img
                    alt={item.title}
                    src={item.thumbnail}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="p-4">
                    <h3 className="text-[15px] font-semibold leading-tight text-card-foreground">
                      {item.title}
                    </h3>
                    <div className="flex flex-col items-start justify-center gap-4 pt-4">
                      <div className="flex items-start justify-center gap-2">
                        <img
                          alt={item.instructor.name}
                          src={item.instructor.avatar}
                          className="rounded-full h-5 w-5"
                        />
                        <p className="text-sm font-medium text-card-foreground">
                          {item.instructor.name}
                        </p>
                      </div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        {item.level}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Button variant="default">Beli Course</Button>
                      <p className="text-lg font-extrabold tracking-tight">
                        Rp. {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons → clean, floating, minimal */}
          {!isAtStart && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-[#007bff]" />
            </button>
          )}

          {!isAtEnd && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5 text-[#007bff]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

SparksCarousel.displayName = "SparksCarousel";
