import { home } from "@/resources";
import { Contact, Hero, RevealFx, RecentProjectsCarousel } from "@/components";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/utils/utils";

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);
  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });
  const recentProjects = sortedProjects.filter(
    (project) => project.slug === "aihoo" || project.slug === "levelapp",
  );

  return (
    <div className="flex flex-col items-center gap-24 pb-12 md:pb-20 w-full">
      <section className="w-full flex flex-col items-center gap-8">
        <div className="w-full">
          <Hero headline={home.headline} subline={home.subline} />
        </div>
      </section>

      {/* Recent Work Section */}
      <section className="w-full flex flex-col items-center gap-12 py-12">
        <div className="flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-backwards">
          <h2 className="text-3xl font-bold tracking-tight">Recent Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl px-4">
            A selection of my latest projects and experiments.
          </p>
        </div>

        <RevealFx translateY="20" delay={0.4} className="w-full">
          <RecentProjectsCarousel projects={recentProjects} />
        </RevealFx>

        <div className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-backwards">
          <Link href="/work">
            <Button variant="outline" size="lg" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
