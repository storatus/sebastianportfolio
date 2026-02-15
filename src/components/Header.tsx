"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  routes,
  display,
  person,
  about,
  blog,
  work,
  gallery,
} from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { Home, User, Grid, Book, Image as ImageIcon } from "lucide-react";

export const Header = () => {
  const pathname = usePathname() ?? "";

  const navItems = [
    {
      href: "/",
      icon: <Home className="w-4 h-4" />,
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/about",
      icon: <User className="w-4 h-4" />,
      label: about.label,
      active: pathname === "/about",
      condition: routes["/about"],
    },
    {
      href: "/work",
      icon: <Grid className="w-4 h-4" />,
      label: work.label,
      active: pathname.startsWith("/work"),
      condition: routes["/work"],
    },
    {
      href: "/blog",
      icon: <Book className="w-4 h-4" />,
      label: blog.label,
      active: pathname.startsWith("/blog"),
      condition: routes["/blog"],
    },
    {
      href: "/gallery",
      icon: <ImageIcon className="w-4 h-4" />,
      label: gallery.label,
      active: pathname.startsWith("/gallery"),
      condition: routes["/gallery"],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      {/* Top blur mask */}
      <div className="absolute top-0 w-full h-20 bg-linear-to-b from-background/80 to-transparent backdrop-blur-sm pointer-events-none -z-10" />

      <nav className="mt-4 px-4 py-2 flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left side: Location */}
        <div className="hidden md:flex flex-1 items-center text-sm text-muted-foreground"></div>

        {/* Center: Navigation Bar */}
        <div className="flex items-center gap-1 p-1 bg-background/20 backdrop-blur-xl border border-foreground/5 rounded-full shadow-2xl transition-all duration-300 hover:border-foreground/10 group">
          {navItems.map((item, index) => {
            if (item.condition === false) return null;
            return (
              <div key={item.href} className="flex items-center gap-1">
                {index === 1 && (
                  <Separator
                    orientation="vertical"
                    className="h-6 mx-1 bg-foreground/10"
                  />
                )}
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full px-4 flex gap-2 transition-all duration-300 hover:bg-foreground/5 active:scale-95",
                    item.active &&
                      "bg-foreground/5 shadow-sm text-primary hover:bg-foreground/10",
                  )}
                >
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "transition-transform duration-300",
                        item.active ? "scale-110" : "group-hover:scale-105",
                      )}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={cn(
                        "hidden lg:inline font-medium tracking-tight",
                        item.active && "inline",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </Button>
              </div>
            );
          })}

          {display.themeSwitcher && (
            <>
              <Separator
                orientation="vertical"
                className="h-6 mx-1 bg-foreground/10"
              />
              <ThemeToggle />
            </>
          )}
        </div>

        {/* Right side: Time */}
        <div className="hidden md:flex flex-1 justify-end items-center text-sm text-muted-foreground gap-5"></div>
      </nav>

      {/* Mobile bottom navigation fallback if needed - but user asked for modern/dev portfolio, sticky/top nav is usually preferred. 
          The original had some logic for fixed bottom on mobile. I will keep it clean for now and test responsiveness. */}
    </header>
  );
};
