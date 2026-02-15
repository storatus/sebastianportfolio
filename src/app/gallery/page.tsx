import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: gallery.title,
    description: gallery.description,
    openGraph: {
      title: gallery.title,
      description: gallery.description,
      url: `${baseURL}${gallery.path}`,
      images: [
        {
          url: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
        },
      ],
    },
  };
}

export default function Gallery() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: gallery.title,
    description: gallery.description,
    url: `${baseURL}${gallery.path}`,
    image: `${baseURL}/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    author: {
      "@type": "Person",
      name: person.name,
      url: `${baseURL}${gallery.path}`,
      image: `${baseURL}${person.avatar}`,
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {gallery.title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {gallery.description}
        </p>
      </div>
      <GalleryView />
    </div>
  );
}
