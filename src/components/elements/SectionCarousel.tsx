"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SectionCarouselProps<TItem> = {
  title: string;
  ariaLabel?: string;
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
  getKey?: (item: TItem) => React.Key;
};

export default function SectionCarousel<TItem>({
  title,
  ariaLabel,
  items,
  renderItem,
  getKey,
}: SectionCarouselProps<TItem>) {
  return (
   <>
      <header className="px-2 mb-6 mt-7">
        <h2 className="text-[18px] font-bold text-text-primary">{title}</h2>
      </header>

      <div className="px-2">
        <div className="bg-border-primary p-px overflow-hidden">
          <Carousel
            aria-label={ariaLabel ?? title}
            opts={{
              align: "start",
              direction: "rtl",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-px bg-border-primary">
              {items.map((item, index) => (
              <CarouselItem
                key={getKey ? getKey(item) : index}
                className="pl-px basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <div className="bg-bg-surface">{renderItem(item)}</div>
              </CarouselItem>
            ))}
            </CarouselContent>

            <CarouselPrevious className="border border-border-secondary left-1" />
            <CarouselNext className="border border-border-secondary right-1" />
          </Carousel>
        </div>
      </div>
      </>
  );
}
