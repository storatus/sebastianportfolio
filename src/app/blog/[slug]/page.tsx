import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
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

  const posts = getPosts(["src", "app", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${blog.path}/${post.slug}`,
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

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

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
    author: {
      "@type": "Person",
      name: person.name,
      url: `${baseURL}${about.path}`,
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollToHash />

      <div className="flex flex-col gap-12">
        {/* Back Button & Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            asChild
            className="-ml-4 text-muted-foreground hover:text-foreground rounded-full"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <ChevronLeft size={18} />
              Back to Blog
            </Link>
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </div>
        </div>

        {/* Header Section */}
        <header className="flex flex-col gap-8 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gradient leading-tight">
              {post.metadata.title}
            </h1>
            {post.metadata.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground italic font-medium max-w-3xl leading-relaxed">
                {post.metadata.subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={person.avatar} />
              <AvatarFallback>{person.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-foreground">{person.name}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                Author
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.metadata.image && (
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/40 shadow-2xl">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <article className="w-full max-w-3xl mx-auto">
          <CustomMDX source={post.content} />
        </article>

        {/* Share Section */}
        <ShareSection
          title={post.metadata.title}
          url={`${baseURL}${blog.path}/${post.slug}`}
        />

        {/* Recent Posts Section */}
        <div className="flex flex-col gap-12 pt-12 border-t border-border/40">
          <div className="flex flex-col gap-4 items-center">
            <h2
              id="recent-posts"
              className="text-3xl font-black tracking-tighter text-gradient"
            >
              Recent posts
            </h2>
            <div className="h-1 w-12 bg-primary/20 rounded-full" />
          </div>
          <Posts
            exclude={[post.slug]}
            range={[1, 2]}
            columns="2"
            thumbnail
            direction="column"
          />
        </div>
      </div>
    </div>
  );
}
