"use client";

import { useState } from "react";
import { socialSharing } from "@/resources";
import { Button } from "@/components/ui/button";
import {
  Twitter,
  Linkedin,
  Facebook,
  Share2,
  MessageCircle,
  Mail,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareSectionProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: <Twitter size={16} />,
    label: "X",
    generateUrl: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: <Linkedin size={16} />,
    label: "LinkedIn",
    generateUrl: (title, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  facebook: {
    name: "facebook",
    icon: <Facebook size={16} />,
    label: "Facebook",
    generateUrl: (title, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: <MessageCircle size={16} />,
    label: "WhatsApp",
    generateUrl: (title, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  email: {
    name: "email",
    icon: <Mail size={16} />,
    label: "Email",
    generateUrl: (title, url) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this post: ${url}`)}`,
  },
};

export function ShareSection({ title, url }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  if (!socialSharing.display) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([key, enabled]) => enabled && socialPlatforms[key])
    .map(([key]) => socialPlatforms[key]);

  return (
    <div className="flex flex-col items-center gap-6 py-12 border-y border-border/40 my-12">
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Share this post
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {enabledPlatforms.map((platform) => (
          <Button
            key={platform.name}
            variant="outline"
            size="icon"
            asChild
            className="rounded-full w-12 h-12 bg-secondary/5 border-border/40 hover:bg-secondary/10 hover:border-primary/50 transition-all hover:scale-105 active:scale-95"
            title={`Share on ${platform.label}`}
          >
            <a
              href={platform.generateUrl(title, url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {platform.icon}
            </a>
          </Button>
        ))}

        {socialSharing.platforms.copyLink && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className={cn(
              "rounded-full w-12 h-12 bg-secondary/5 border-border/40 hover:border-primary/50 transition-all hover:scale-105 active:scale-95",
              copied
                ? "border-green-500/50 text-green-500 bg-green-500/5 italic"
                : "hover:bg-secondary/10",
            )}
            title="Copy link"
          >
            {copied ? <Check size={16} /> : <LinkIcon size={16} />}
          </Button>
        )}
      </div>
    </div>
  );
}
