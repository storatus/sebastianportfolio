"use client";

import { gallery } from "@/resources";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GalleryView() {
  return (
    <div className="columns-1 sm:columns-2 gap-6 space-y-6">
      {gallery.images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="break-inside-avoid"
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 group cursor-zoom-in",
              image.orientation === "horizontal"
                ? "aspect-[16/9]"
                : "aspect-[3/4]",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 4}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <p className="text-sm font-medium text-foreground translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {image.alt}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
