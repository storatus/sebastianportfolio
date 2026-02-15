import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import Link from "next/link";
import { CodeBlock } from "./mdx/CodeBlock";

import { RevealFx } from "@/components";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Card as ShadcnCard } from "@/components/ui/card";
import {
  ChevronRight,
  ArrowUpRight,
  Rocket,
  X,
  Check,
  Info,
  AlertTriangle,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Internal Components ---

const InlineCode = ({ children }: { children: ReactNode }) => (
  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    {children}
  </code>
);

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <details className="mb-4 rounded-xl border border-border/40 bg-secondary/5 overflow-hidden">
    <summary className="px-6 py-4 cursor-pointer font-bold hover:bg-secondary/10 transition-colors list-none flex items-center justify-between">
      {title}
      <span className="text-muted-foreground">+</span>
    </summary>
    <div className="px-6 py-4 border-t border-border/40 bg-background/50">
      {children}
    </div>
  </details>
);

const AccordionGroup = ({ children }: { children: ReactNode }) => (
  <div className="mb-8">{children}</div>
);

const Table = ({ children }: { children: ReactNode }) => (
  <div className="my-8 overflow-x-auto rounded-xl border border-border/40">
    <table className="w-full text-left border-collapse">{children}</table>
  </div>
);

const Feedback = ({ children }: { children: ReactNode }) => (
  <div className="my-8 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-foreground/90 italic">
    {children}
  </div>
);

// --- Shim Components for Legacy MDX ---

const Column = ({ children, className, fillWidth, ...props }: any) => (
  <div
    className={cn("flex flex-col gap-4", fillWidth && "w-full", className)}
    {...props}
  >
    {children}
  </div>
);

const Row = ({ children, className, fillWidth, ...props }: any) => (
  <div
    className={cn(
      "flex flex-row gap-4 flex-wrap items-center",
      fillWidth && "w-full",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const Grid = ({ children, columns, className, ...props }: any) => (
  <div
    className={cn("grid gap-4", className)}
    style={{ gridTemplateColumns: `repeat(${columns || 1}, minmax(0, 1fr))` }}
    {...props}
  >
    {children}
  </div>
);

const Text = ({ children, variant, className, align, ...props }: any) => {
  const classes: Record<string, string> = {
    "heading-strong-m": "text-2xl font-bold tracking-tight text-foreground",
    "body-default-s": "text-sm text-muted-foreground",
  };
  return (
    <div
      className={cn(
        classes[variant] || "",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Button = ({
  label,
  children,
  href,
  variant,
  size,
  suffixIcon,
  weight,
  ...props
}: any) => {
  const content = (
    <>
      {label || children}
      {suffixIcon === "chevronRight" && (
        <ChevronRight className="ml-1 w-4 h-4" />
      )}
    </>
  );

  const buttonVariant =
    variant === "tertiary"
      ? "outline"
      : variant === "secondary"
        ? "secondary"
        : variant === "primary"
          ? "default"
          : "default";

  const buttonSize = size === "s" ? "sm" : "default";

  if (href) {
    const isExternal = href.startsWith("http");
    const LinkComponent = isExternal ? "a" : Link;
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : { href };

    return (
      <ShadcnButton
        variant={buttonVariant as any}
        size={buttonSize as any}
        asChild
        {...props}
      >
        <LinkComponent
          {...(linkProps as any)}
          className="inline-flex items-center"
        >
          {content}
        </LinkComponent>
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      variant={buttonVariant as any}
      size={buttonSize as any}
      {...props}
    >
      {content}
    </ShadcnButton>
  );
};

const Icon = ({ name, className, size, ...props }: any) => {
  const iconMap: Record<string, any> = {
    rocket: Rocket,
    close: X,
    check: Check,
    info: Info,
    warning: AlertTriangle,
    chevronDown: ChevronDown,
    chevronRight: ChevronRight,
    search: Search,
  };

  const IconComponent = iconMap[name] || Info;
  const iconSize = size === "m" ? 20 : size === "s" ? 16 : 24;

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <IconComponent size={iconSize} />
    </div>
  );
};

const Media = ({ src, alt, aspectRatio, className, radius, ...props }: any) => (
  <div
    className={cn(
      "relative overflow-hidden border border-border/40 my-8 shadow-lg",
      radius === "l" ? "rounded-2xl" : "rounded-xl",
      className,
    )}
    style={aspectRatio ? { aspectRatio: aspectRatio.replace("/", " / ") } : {}}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      {...props}
    />
  </div>
);

const SmartLink = ({ href, children, suffixIcon, ...props }: any) => (
  <Link
    href={href}
    className="inline-flex items-center gap-1 text-primary hover:underline font-medium transition-all"
    {...props}
  >
    {children}
    {suffixIcon === "chevronRight" && <ChevronRight size={14} />}
    {suffixIcon === "arrowUpRight" && <ArrowUpRight size={14} />}
  </Link>
);

const Card = ({ children, href, className, padding, gap, ...props }: any) => (
  <ShadcnCard
    className={cn(
      "overflow-hidden transition-all hover:bg-secondary/5 border-border/40",
      href && "cursor-pointer",
      className,
    )}
    {...props}
  >
    {href ? (
      <Link href={href} className="flex flex-col h-full">
        {children}
      </Link>
    ) : (
      <div className="flex flex-col h-full">{children}</div>
    )}
  </ShadcnCard>
);

// --- MDX Transformation Logic ---

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className="text-primary hover:underline font-medium transition-all"
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className="text-primary hover:underline font-medium transition-all"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline font-medium transition-all inline-flex items-center gap-1"
      {...props}
    >
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: any) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <figure className="my-8">
      <img
        className="rounded-2xl border border-border/40 shadow-lg w-full h-auto object-cover"
        alt={alt}
        src={src}
        {...props}
      />
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

function slugify(str: string): string {
  if (typeof str !== "string") return "";
  const strWithAnd = str.replace(/&/g, " and ");
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
}

function createHeading(Level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children, ...props }: { children: ReactNode }) => {
    const slug = slugify(children as string);
    const classes = {
      h1: "text-4xl md:text-5xl font-black tracking-tighter mb-8 mt-12",
      h2: "text-3xl md:text-4xl font-bold tracking-tight mb-6 mt-10 text-foreground/90",
      h3: "text-2xl md:text-3xl font-bold tracking-tight mb-4 mt-8 text-foreground/80",
      h4: "text-xl md:text-2xl font-semibold mb-4 mt-6",
      h5: "text-lg md:text-xl font-semibold mb-2 mt-4",
      h6: "text-base font-semibold mb-2 mt-4",
    };

    return (
      <Level id={slug} className={classes[Level]} {...props}>
        {children}
      </Level>
    );
  };

  CustomHeading.displayName = `${Level}`;
  return CustomHeading;
}

function createParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg leading-relaxed text-muted-foreground/90 mb-6 last:mb-0">
      {children}
    </p>
  );
}

function createCodeBlock(props: any) {
  if (
    props.children &&
    props.children.props &&
    props.children.props.className
  ) {
    const { className, children } = props.children.props;
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        codes={[
          {
            code: children,
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }
  return (
    <pre
      className="p-4 rounded-xl bg-muted/50 overflow-x-auto my-6"
      {...props}
    />
  );
}

function createList(as: "ul" | "ol") {
  const ListTag = as;
  return ({ children }: { children: ReactNode }) => (
    <ListTag
      className={
        as === "ul"
          ? "list-disc ml-6 mb-6 space-y-2"
          : "list-decimal ml-6 mb-6 space-y-2"
      }
    >
      {children}
    </ListTag>
  );
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <li className="text-lg text-muted-foreground/90 leading-relaxed pl-1">
      {children}
    </li>
  );
}

function createHR() {
  return <hr className="my-12 border-border/40" />;
}

const components = {
  p: createParagraph,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  code: InlineCode,
  pre: createCodeBlock,
  ol: createList("ol"),
  ul: createList("ul"),
  li: createListItem,
  hr: createHR,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  RevealFx,
  Column,
  Row,
  Grid,
  Text,
  Button,
  Icon,
  Media,
  SmartLink,
  Card,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote
        options={{ blockJS: false }}
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  );
}
