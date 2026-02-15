"use client";

import { mailchimp, newsletter } from "@/resources";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

export const Mailchimp: React.FC<{ className?: string }> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    setTouched(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  if (newsletter.display === false) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full p-8 md:p-12 rounded-[2.5rem] bg-secondary/5 border border-border/40 backdrop-blur-md shadow-xl flex flex-col items-center gap-8",
        className,
      )}
    >
      {/* Background Decorative Elements - simpler than once-ui Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

      <div className="max-w-md w-full text-center space-y-4 relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground/90">
          {newsletter.title}
        </h3>
        <p className="text-muted-foreground text-lg text-balance opacity-80">
          {newsletter.description}
        </p>
      </div>

      <form
        className="w-full max-w-md relative z-10"
        action={mailchimp.action}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-full space-y-2">
            <Input
              id="mce-EMAIL"
              name="EMAIL"
              type="email"
              placeholder="Enter your email"
              required
              className={cn(
                "h-14 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20",
                error && "border-destructive focus:border-destructive",
              )}
              onChange={(e) => {
                if (error) {
                  handleChange(e);
                } else {
                  debouncedHandleChange(e);
                }
              }}
              onBlur={handleBlur}
            />
            {error && (
              <p className="text-destructive text-sm font-medium ml-2 animate-in fade-in slide-in-from-top-1">
                {error}
              </p>
            )}
          </div>

          {/* Honeypot field */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-5000px" }}
          >
            <input
              type="text"
              readOnly
              name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa"
              tabIndex={-1}
              value=""
            />
          </div>

          <Button
            type="submit"
            id="mc-embedded-subscribe"
            className="w-full sm:w-auto h-14 rounded-full px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 whitespace-nowrap"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
};
