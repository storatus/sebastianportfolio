"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-semibold ml-1">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Name"
                    {...field}
                    className="rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 h-12"
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-semibold ml-1">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    {...field}
                    className="rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 h-12"
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium ml-1" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80 font-semibold ml-1">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can I help you?"
                  {...field}
                  className="rounded-3xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 min-h-[160px] resize-none"
                />
              </FormControl>
              <FormMessage className="text-xs font-medium ml-1" />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto min-w-[200px] h-14 rounded-full text-lg font-bold gap-3 shadow-lg hover:shadow-xl transition-all active:scale-95 group"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin rounded-full" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Message
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            )}
          </Button>
        </div>

        {submitStatus === "success" && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm font-semibold">
              Message sent successfully! I'll get back to you soon.
            </p>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-semibold">
              Something went wrong. Please try again later.
            </p>
          </div>
        )}
      </form>
    </Form>
  );
};
