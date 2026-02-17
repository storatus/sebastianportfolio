"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProjectImagesProps {
  images: string[];
  title: string;
}

export function ProjectImages({ images, title }: ProjectImagesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openLightbox = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="w-full relative group/carousel px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  className="relative aspect-video rounded-3xl overflow-hidden border border-border/40 shadow-2xl w-full cursor-zoom-in group"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image}
                    alt={`${title} - ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent pointer-events-none" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-0 -translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
              <CarouselNext className="right-0 translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
            </>
          )}
        </Carousel>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none backdrop-blur-none">
          <DialogTitle className="sr-only">{title} images</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            <Carousel
              opts={{
                startIndex: startIndex,
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center p-4"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={image}
                        alt={`${title} - ${index + 1}`}
                        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 md:-left-12 bg-background/50 hover:bg-background/80 border-none h-12 w-12" />
                  <CarouselNext className="right-4 md:-right-12 bg-background/50 hover:bg-background/80 border-none h-12 w-12" />
                </>
              )}
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
