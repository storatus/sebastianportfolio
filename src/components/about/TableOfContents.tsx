"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  structure,
  about,
}) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <nav className="flex flex-col gap-6 text-sm font-medium">
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-3">
            <button
              onClick={() => scrollTo(section.title, 80)}
              className="flex items-center gap-3 group text-muted-foreground hover:text-primary transition-colors text-left"
            >
              <div className="h-px w-4 bg-muted-foreground/30 group-hover:bg-primary group-hover:w-8 transition-all" />
              <span className="tracking-tight">{section.title}</span>
            </button>

            {about.tableOfContent.subItems && (
              <div className="flex flex-col gap-2 pl-6 border-l border-border/50 ml-2">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => scrollTo(item, 80)}
                    className="text-muted-foreground/60 hover:text-primary transition-colors text-xs text-left py-1"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
    </nav>
  );
};

export default TableOfContents;
