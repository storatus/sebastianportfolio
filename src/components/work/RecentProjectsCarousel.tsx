"use client";

import { ProjectCard } from "@/components/ProjectCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Project {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    images: string[];
    team: { avatar: string }[];
    link?: string;
    isMobile?: boolean;
  };
  content: string;
}

interface RecentProjectsCarouselProps {
  projects: Project[];
}

export function RecentProjectsCarousel({
  projects,
}: RecentProjectsCarouselProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative group">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((post, index) => (
            <CarouselItem
              key={post.slug}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2"
            >
              <div className="h-full">
                <ProjectCard
                  priority={index < 1}
                  href={`/work/${post.slug}`}
                  images={post.metadata.images}
                  title={post.metadata.title}
                  description={post.metadata.summary}
                  content={post.content}
                  avatars={
                    post.metadata.team?.map((member) => ({
                      src: member.avatar,
                    })) || []
                  }
                  link={post.metadata.link || ""}
                  isMobile={post.metadata.isMobile}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
