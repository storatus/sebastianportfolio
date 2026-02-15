import { person, social } from "@/resources";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />,
  };

  return (
    <footer className="w-full flex flex-col items-center py-12 px-6 border-t border-border/50 bg-secondary/10 backdrop-blur-sm">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            © {currentYear} {person.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {social.map(
            (item) =>
              item.link && (
                <Button
                  key={item.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-10 h-10 hover:bg-muted/50 transition-all group"
                  title={item.name}
                >
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {iconMap[item.icon] || (
                        <div className="w-5 h-5 bg-muted-foreground/20 rounded-sm" />
                      )}
                    </span>
                  </Link>
                </Button>
              ),
          )}
        </div>
      </div>
    </footer>
  );
};
