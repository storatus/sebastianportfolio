"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  isMobile?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars = [],
  link,
  isMobile = false,
}) => {
  return (
    <Card className="group overflow-hidden border-border/50 bg-secondary/5 backdrop-blur-sm transition-all duration-500 hover:border-border hover:shadow-2xl flex flex-col h-full rounded-[2rem] relative">
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={`View ${title}`}
      >
        <span className="sr-only">View {title}</span>
      </Link>

      {/* Image Carousel */}
      <div className="relative aspect-video overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full bg-muted/10">
                  <img
                    src={image}
                    alt={`${title} - slide ${index + 1}`}
                    className={cn(
                      "transition-transform duration-700 group-hover:scale-105 w-full h-full",
                      isMobile ? "object-contain" : "object-cover",
                    )}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            </>
          )}
        </Carousel>
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-8 gap-6">
        <div className="space-y-4">
          <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>

          {description?.trim() && (
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-3">
              {description}
            </p>
          )}
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-6">
          {/* Avatars */}
          {avatars?.length > 0 && (
            <div className="flex -space-x-3 overflow-hidden">
              {avatars.slice(0, 5).map((avatar, idx) => (
                <Avatar
                  key={idx}
                  className="border-2 border-background w-8 h-8 md:w-10 md:h-10"
                >
                  <AvatarImage src={avatar.src} />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              ))}
              {avatars.length > 5 && (
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted border-2 border-background text-[10px] md:text-xs font-medium">
                  +{avatars.length - 5}
                </div>
              )}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4 relative z-20">
            {href && (
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="rounded-full px-6 gap-2 glass border-none hover:bg-primary hover:text-primary-foreground transition-all shadow-md group/btn"
              >
                <Link href={href}>
                  <span>Read case study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            )}
            {link && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full px-6 gap-2 hover:bg-muted/50 transition-all"
              >
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  <span>View live</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
