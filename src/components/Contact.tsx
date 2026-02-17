"use client";

import { RevealFx } from "@/components/RevealFx";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full max-w-4xl mx-auto flex flex-col gap-12 py-20 px-6"
    >
      <div className="text-center space-y-4">
        <RevealFx translateY="4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground/90">
            Get in Touch
          </h2>
        </RevealFx>
        <RevealFx translateY="8" delay={0.1}>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from
            you.
          </p>
        </RevealFx>
      </div>

      <RevealFx translateY="12" delay={0.2}>
        <div className="p-4 sm:p-8 md:p-12 rounded-[2.5rem] bg-secondary/5 border border-border/40 backdrop-blur-md shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <ContactForm />
        </div>
      </RevealFx>
    </section>
  );
};
