"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

interface MotionCarouselProps {
  slides: ReactNode[];
  selectedIndex: number;
  onSlideChange: (index: number) => void;
  options?: EmblaOptionsType;
}

export function MotionCarousel({
  slides,
  selectedIndex,
  onSlideChange,
  options,
}: MotionCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: true,
    ...options,
  });

  // Sync external index → carousel
  useEffect(() => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== selectedIndex) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [emblaApi, selectedIndex]);

  // Sync carousel → external index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const snap = emblaApi.selectedScrollSnap();
    if (snap !== selectedIndex) onSlideChange(snap);
  }, [emblaApi, selectedIndex, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden flex-1" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex-[0_0_100%] min-w-0 px-1"
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
