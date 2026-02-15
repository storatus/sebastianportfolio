import { person, social } from "@/resources";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex flex-col items-center py-12 px-6 border-t border-border/50 bg-secondary/10 backdrop-blur-sm">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            © {currentYear} {person.name}
          </span>
          <span className="hidden md:inline h-4 w-[1px] bg-border/50" />
          <p>
            Build your portfolio with{" "}
            <Link
              href="https://once-ui.com/products/magic-portfolio"
              className="text-primary hover:underline transition-all"
            >
              Once UI
            </Link>
          </p>
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
                    {/* Assuming item.icon is a string class name or similar that once-ui handled. 
                        If it's an icon name, we might need a mapping or just icons from lucide. 
                        For now I'll try to render it or use a fallback if it's a string. */}
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {/* Placeholder for icon - social icons usually need specific mapping or standard icons */}
                      <div className="w-5 h-5 bg-muted-foreground/20 rounded-sm" />
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
