"use client";

import { RevealFx } from "@/components/RevealFx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProjectCTAProps {
  title?: string;
  summary?: string;
  link: string;
}

export const ProjectCTA = ({ title, summary, link }: ProjectCTAProps) => {
  const displayTitle = title || "Experience the Project";
  const displaySummary =
    summary ||
    "Explore the live version of this project to see it in action and learn more about its features.";
  const displayUrl = link.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <Card className="my-16 p-px bg-linear-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl border-none overflow-hidden group shadow-2xl w-full">
      <div className="bg-background/90 backdrop-blur-xl p-8 md:p-12 rounded-[23px] relative overflow-hidden h-full flex flex-col items-center text-center gap-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

        <RevealFx translateY={10}>
          <div className="p-4 rounded-3xl bg-primary/10 w-fit mx-auto mb-4 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Rocket size={24} className="text-primary" />
          </div>
        </RevealFx>

        <div className="space-y-4 max-w-2xl">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gradient leading-tight">
            {displayTitle}
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {displaySummary}
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="h-16 px-10 text-xl rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1 font-bold group/btn bg-primary text-primary-foreground border-none"
        >
          <Link href={link} target="_blank" className="flex items-center gap-3">
            Visit {displayUrl}
            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </Card>
  );
};
