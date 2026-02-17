import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX, ProjectImages } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${work.path}/${post.slug}`,
      images: [
        {
          url:
            post.metadata.image ||
            `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
        },
      ],
    },
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find(
    (post) => post.slug === slugPath,
  );

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.summary,
    image:
      post.metadata.image ||
      `${baseURL}/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    author: {
      "@type": "Person",
      name: person.name,
      url: `${baseURL}${about.path}`,
    },
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0 flex flex-col items-center gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToHash />

      <div className="w-full flex flex-col gap-8 items-center text-center">
        <Button
          variant="ghost"
          asChild
          className="text-muted-foreground hover:text-foreground rounded-full"
        >
          <Link href="/work" className="flex items-center gap-2">
            <ChevronLeft size={18} />
            Back to Projects
          </Link>
        </Button>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gradient leading-tight">
            {post.metadata.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {post.metadata.team && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              {post.metadata.team.map((member, idx) => (
                <Avatar
                  key={idx}
                  className="border-2 border-background w-10 h-10"
                >
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-2 text-sm font-medium text-primary">
              {post.metadata.team.map((member, idx) => (
                <span key={idx} className="flex items-center">
                  {idx > 0 && (
                    <span className="text-muted-foreground mr-2">,</span>
                  )}
                  <Link
                    href={member.linkedIn}
                    target="_blank"
                    className="hover:underline transition-all"
                  >
                    {member.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        )}
        {post.metadata.link && (
          <Button
            asChild
            variant="outline"
            className="rounded-full gap-2 mt-2 group/live shadow-sm hover:shadow-md transition-all"
          >
            <Link href={post.metadata.link} target="_blank">
              View Live Project
              <ExternalLink
                size={16}
                className="group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform"
              />
            </Link>
          </Button>
        )}
      </div>

      {post.metadata.images.length > 0 && (
        <ProjectImages
          images={post.metadata.images}
          title={post.metadata.title}
        />
      )}

      <article className="w-full max-w-3xl mx-auto py-8">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
