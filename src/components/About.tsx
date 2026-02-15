"use client";

import { RevealFx } from "@once-ui-system/core";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { person } from "@/resources";

export const About = () => {
  return (
    <section
      id="about"
      className="w-full flex flex-col gap-20 py-32 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] -translate-y-1/2 -z-10" />

      <RevealFx translateY={8}>
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gradient">
            About Me
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full glow-sm" />
        </div>
      </RevealFx>

      <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-5">
          <RevealFx translateX={-20} delay={0.2}>
            <div className="relative group">
              {/* Portal effect rings */}
              <div className="absolute -inset-4 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-8 border border-primary/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute -inset-1 bg-linear-to-br from-primary via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-background shadow-2xl">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage
                    src={person.avatar}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <AvatarFallback className="text-4xl">
                    {person.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </RevealFx>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-8">
          <RevealFx translateX={20} delay={0.3}>
            <div className="p-10 rounded-[2.5rem] bg-secondary/5 border border-border/40 backdrop-blur-xl shadow-2xl hover:shadow-primary/5 transition-all relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
              <p className="text-2xl md:text-3xl text-foreground font-medium leading-tight tracking-tight relative z-10">
                I'm a passionate developer with a knack for building{" "}
                <span className="text-gradient-primary font-bold italic">
                  beautiful
                </span>{" "}
                and functional digital experiences.
              </p>
            </div>
          </RevealFx>

          <RevealFx translateX={20} delay={0.4}>
            <div className="p-10 rounded-[2.5rem] bg-background/40 border border-border/20 backdrop-blur-2xl shadow-xl hover:shadow-primary/5 transition-all relative group overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-[50px] -ml-16 -mb-16 group-hover:bg-primary/10 transition-colors" />
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed relative z-10">
                My journey in tech has been driven by curiosity and a desire to
                solve complex problems with elegant code. When I'm not coding,
                you can find me exploring the outdoors or experimenting with new
                design patterns.
              </p>
            </div>
          </RevealFx>
        </div>
      </div>
    </section>
  );
};
