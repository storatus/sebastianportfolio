"use client";

import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({
  post,
  thumbnail,
  direction = "column",
}: PostProps) {
  const isRow = direction === "row";

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card
        className={cn(
          "overflow-hidden border-border/40 bg-secondary/5 backdrop-blur-sm transition-all duration-500 hover:border-border hover:shadow-xl hover:bg-secondary/10 flex h-full rounded-3xl",
          isRow ? "flex-col md:flex-row" : "flex-col",
        )}
      >
        {post.metadata.image && thumbnail && (
          <div
            className={cn(
              "relative overflow-hidden aspect-video",
              isRow ? "md:w-2/5" : "w-full",
            )}
          >
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col p-6 flex-1 gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-6 h-6 border border-border/50">
              <AvatarImage src={person.avatar} />
              <AvatarFallback>{person.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground/80">
              {person.name}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {formatDate(post.metadata.publishedAt, false)}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-snug">
              {post.metadata.title}
            </h3>
            {post.metadata.tag && (
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-widest bg-primary/5 text-primary border-primary/20 rounded-full px-3"
              >
                {post.metadata.tag}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
