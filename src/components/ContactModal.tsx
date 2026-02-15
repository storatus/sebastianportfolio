"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ContactModalProps {
  trigger?: React.ReactNode;
}

export const ContactModal = ({ trigger }: ContactModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="rounded-full h-10 px-4 glass border-primary/20 hover:bg-primary/5 transition-all"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Contact Me</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-background/80 backdrop-blur-xl border-primary/20 rounded-[2.5rem] p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            Get in Touch
          </DialogTitle>
          <p className="text-muted-foreground text-center mt-2">
            Have a project in mind or just want to say hi? I'd love to hear from
            you.
          </p>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
};
