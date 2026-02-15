import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `${baseURL}${blog.path}`,
      images: [
        {
          url: `${baseURL}/api/og/generate?title=${encodeURIComponent(blog.title)}`,
        },
      ],
      type: "website",
    },
  };
}

export default function Blog() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: blog.title,
    description: blog.description,
    url: `${baseURL}${blog.path}`,
    author: {
      "@type": "Person",
      name: person.name,
      url: `${baseURL}`,
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-12 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gradient leading-none mb-8 px-4">
        {blog.title}
      </h1>

      <div className="w-full flex flex-col gap-24 px-4">
        <div className="flex flex-col gap-12">
          {/* Latest Post */}
          <Posts range={[1, 1]} thumbnail />

          {/* Next Two Posts */}
          <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        </div>

        {/* Newsletter Section */}
        <section className="w-full">
          <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-secondary/20 to-secondary/5 backdrop-blur-3xl border border-border/40 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-20 -mt-20 transition-all group-hover:bg-primary/20" />
            <div className="relative z-10">
              <Mailchimp />
            </div>
          </div>
        </section>

        {/* Earlier Posts Section */}
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground/90 whitespace-nowrap">
              Earlier posts
            </h2>
            <div className="h-px flex-1 bg-border/40" />
          </div>

          <Posts range={[4]} columns="2" />
        </div>
      </div>
    </div>
  );
}
