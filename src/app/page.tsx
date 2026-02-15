import { home } from "@/resources";
import { Contact, Hero, RevealFx } from "@/components";
import { Projects } from "@/components/work/Projects";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-24 pb-12 md:pb-20 w-full">
      <section className="w-full flex flex-col items-center gap-8">
        <div className="w-full">
          <Hero headline={home.headline} subline={home.subline} />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full space-y-12">
        <RevealFx translateY="20" delay={0.6}>
          <Projects range={[1, 1]} />
        </RevealFx>
      </section>

      {/* More Projects */}
      <section className="w-full">
        <Projects range={[2]} />
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
