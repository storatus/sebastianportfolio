import { home } from "@/resources";
import { Mailchimp, Hero, RevealFx } from "@/components";
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

      {/* Newsletter / CTA */}
      <section className="w-full max-w-5xl px-4">
        <div className="relative p-10 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-secondary/20 to-secondary/5 backdrop-blur-3xl border border-white/5 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-20 -mt-20 transition-all group-hover:bg-primary/20" />
          <div className="relative z-10">
            <Mailchimp />
          </div>
        </div>
      </section>
    </div>
  );
}
