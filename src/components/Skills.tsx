"use client";

import { RevealFx } from "@once-ui-system/core";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
} from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "Docker", icon: FaDocker, color: "#2496ED" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

export const Skills = () => {
  return (
    <section id="skills" className="w-full flex flex-col gap-12 py-20 px-4">
      <RevealFx translateY="4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground/90">
          Skills
        </h2>
      </RevealFx>

      <TooltipProvider delayDuration={0}>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8 justify-items-center">
          {skills.map((skill, index) => (
            <RevealFx key={skill.name} delay={index * 0.05} translateY="8">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group relative flex flex-col items-center gap-4 transition-all hover:-translate-y-2">
                    <div className="relative p-6 md:p-8 rounded-[2rem] bg-secondary/5 border border-border/40 backdrop-blur-md shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:bg-secondary/10 group-hover:border-primary/20">
                      <skill.icon
                        className="w-10 h-10 md:w-12 md:h-12 transition-all duration-500 text-muted-foreground group-hover:text-primary"
                        style={{ color: "currentColor" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = skill.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "currentColor";
                        }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="rounded-full px-4 py-2 font-bold bg-primary text-primary-foreground border-none">
                  {skill.name}
                </TooltipContent>
              </Tooltip>
            </RevealFx>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
};
