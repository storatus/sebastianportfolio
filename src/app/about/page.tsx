"use client";

import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RevealFx } from "@/components";
import {
  Calendar,
  Globe,
  ChevronRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: about.lecturing.title,
      display: about.lecturing.display,
      items: about.lecturing.items.map((item) => item.title),
    },
  ];

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "x":
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-12 py-12 px-4 md:px-8">
      {about.tableOfContent.display && (
        <aside className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 z-20">
          <TableOfContents structure={structure} about={about} />
        </aside>
      )}

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16">
        {/* Left Column: Avatar & Quick Info */}
        {about.avatar.display && (
          <aside className="lg:w-1/4 flex flex-col items-center lg:items-start gap-8 sticky top-32 h-fit">
            <RevealFx translateY={20}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-br from-primary via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                <Avatar className="w-48 h-48 md:w-64 md:h-64 border-2 border-background shadow-2xl rounded-2xl">
                  <AvatarImage src={person.avatar} className="object-cover" />
                  <AvatarFallback className="text-4xl">
                    {person.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </RevealFx>

            <div className="flex flex-col gap-4 items-center lg:items-start">
              <RevealFx translateY={10} delay={0.2}>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>{person.location}</span>
                </div>
              </RevealFx>

              {person.languages && person.languages.length > 0 && (
                <RevealFx translateY={10} delay={0.3}>
                  <div className="flex flex-col gap-3 items-center lg:items-start">
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {person.languages.map((langStr, index) => {
                        const match = langStr.match(/(.+)\s\((.+)\)/);
                        const name = match ? match[1] : langStr;

                        return (
                          <Badge
                            key={index}
                            variant="outline"
                            className="rounded-full px-4 py-1.5 flex items-center gap-2.5 border border-primary/20 bg-primary/5 backdrop-blur-md group hover:border-primary transition-all shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm font-semibold tracking-tight">
                              {name}
                            </span>
                          </Badge>
                        );
                      })}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                      Native • Fluent Proficiency
                    </span>
                  </div>
                </RevealFx>
              )}
            </div>
          </aside>
        )}

        {/* Right Column: Main Content */}
        <main className="lg:w-3/4 flex flex-col gap-24">
          <section
            id={about.intro.title}
            className="flex flex-col gap-8 items-center lg:items-start"
          >
            <RevealFx translateY={20}>
              <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
                {about.calendar.display && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full h-10 px-4 glass border-primary/20 hover:bg-primary/5 transition-all mb-4"
                  >
                    <a href={about.calendar.link}>
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">
                        Schedule a call
                      </span>
                      <ChevronRight className="w-4 h-4 ml-2 opacity-50" />
                    </a>
                  </Button>
                )}
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gradient leading-none">
                  {person.name}
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-muted-foreground tracking-tight">
                  {person.role}
                </p>
              </div>
            </RevealFx>

            {social.length > 0 && (
              <RevealFx translateY={10} delay={0.4}>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {social
                    .filter((item) => item.essential)
                    .map((item) => {
                      const icon = getIcon(item.name);
                      return (
                        <Button
                          key={item.name}
                          variant="secondary"
                          size="sm"
                          className="rounded-full px-4 flex gap-2 h-9 border border-border/50 hover:border-primary/50 transition-all"
                          asChild
                        >
                          <a href={item.link}>
                            {icon}
                            <span>{item.name}</span>
                          </a>
                        </Button>
                      );
                    })}
                </div>
              </RevealFx>
            )}

            {about.intro.display && (
              <RevealFx translateY={20} delay={0.5}>
                <div className="text-xl md:text-2xl leading-relaxed text-muted-foreground/90 max-w-3xl">
                  {about.intro.description}
                </div>
              </RevealFx>
            )}
          </section>

          {/* Experience Section */}
          {about.work.display && (
            <section id={about.work.title} className="flex flex-col gap-12">
              <RevealFx translateY={20}>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gradient">
                  {about.work.title}
                </h2>
              </RevealFx>

              <div className="flex flex-col gap-16">
                {about.work.experiences.map((experience, index) => (
                  <RevealFx key={index} translateY={20} delay={index * 0.1}>
                    <div className="group relative flex flex-col gap-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                        <div className="flex flex-col">
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            {experience.company}
                          </h3>
                          <span className="text-lg font-medium text-primary italic">
                            {experience.role}
                          </span>
                        </div>
                        <span className="text-sm md:text-base font-medium text-muted-foreground tabular-nums">
                          {experience.timeframe}
                        </span>
                      </div>

                      <ul className="grid gap-4 list-none p-0">
                        {experience.achievements.map(
                          (achievement: React.ReactNode, aIndex: number) => (
                            <li
                              key={aIndex}
                              className="flex gap-3 text-lg text-muted-foreground leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-3" />
                              <span>{achievement}</span>
                            </li>
                          ),
                        )}
                      </ul>

                      {experience.images && experience.images.length > 0 && (
                        <div className="flex flex-wrap gap-4 pt-4">
                          {experience.images.map((image, iIndex) => (
                            <div
                              key={iIndex}
                              className="rounded-xl overflow-hidden border border-border/50 shadow-md"
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </RevealFx>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {about.studies.display && (
            <section id={about.studies.title} className="flex flex-col gap-12">
              <RevealFx translateY={20}>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gradient">
                  {about.studies.title}
                </h2>
              </RevealFx>

              <div className="grid md:grid-cols-2 gap-8">
                {about.studies.institutions.map((institution, index) => (
                  <RevealFx key={index} translateY={20} delay={index * 0.1}>
                    <div className="p-8 rounded-3xl bg-secondary/5 border border-border/40 backdrop-blur-sm flex flex-col gap-2">
                      <h3 className="text-xl font-bold">{institution.name}</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {institution.description}
                      </p>
                    </div>
                  </RevealFx>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {about.technical.display && (
            <section
              id={about.technical.title}
              className="flex flex-col gap-12"
            >
              <RevealFx translateY={20}>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gradient">
                  {about.technical.title}
                </h2>
              </RevealFx>

              <div className="flex flex-col gap-16">
                {about.technical.skills.map((skill, index) => (
                  <RevealFx key={index} translateY={20} delay={index * 0.1}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-bold tracking-tight">
                          {skill.title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed italic">
                          {skill.description}
                        </p>
                      </div>

                      {skill.tags && skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {skill.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="secondary"
                              className="rounded-full px-4 h-8 text-sm flex gap-2 border border-border/50"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {skill.images && skill.images.length > 0 && (
                        <div className="flex flex-wrap gap-4 pt-4">
                          {skill.images.map((image, iIndex) => (
                            <div
                              key={iIndex}
                              className="rounded-xl overflow-hidden border border-border/50 shadow-md"
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </RevealFx>
                ))}
              </div>
            </section>
          )}

          {/* Lecturing Section */}
          {about.lecturing.display && (
            <section
              id={about.lecturing.title}
              className="flex flex-col gap-12"
            >
              <RevealFx translateY={20}>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gradient">
                  {about.lecturing.title}
                </h2>
              </RevealFx>

              <div className="flex flex-col gap-16">
                {about.lecturing.items.map((item, index) => (
                  <RevealFx key={index} translateY={20} delay={index * 0.1}>
                    <div className="group relative flex flex-col gap-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                        <div className="flex flex-col">
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            {item.title}
                          </h3>
                          <span className="text-lg font-medium text-primary italic">
                            {item.role}
                          </span>
                        </div>
                        <span className="text-sm md:text-base font-medium text-muted-foreground tabular-nums">
                          {item.timeframe}
                        </span>
                      </div>
                      <div className="text-lg text-muted-foreground leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </RevealFx>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
