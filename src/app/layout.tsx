import "@/resources/custom.css";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { baseURL, fonts, home } from "@/resources";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  metadataBase: new URL(baseURL),
  openGraph: {
    title: home.title,
    description: home.description,
    images: [{ url: home.image }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
        "h-full antialiased",
      )}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden selection:bg-primary/20 transition-colors duration-500">
        <Providers>
          {/* Premium Theme-Aware Background */}
          <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
            {/* Base layer with theme-aware dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, hsl(var(--foreground) / 0.15) 1px, transparent 0)
                `,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-primary/5" />

            {/* Animated Glows - Theme Aware */}
            <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none delay-1000" />

            {/* Dynamic Light/Dark accents */}
            <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-400/5 animate-pulse pointer-events-none delay-500" />
            <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-400/5 animate-pulse pointer-events-none delay-700" />
          </div>

          <Header />

          <main className="flex-1 w-full flex flex-col items-center px-4 md:px-8 mt-24 mb-16 relative z-0">
            <div className="w-full max-w-7xl mx-auto flex justify-center">
              <RouteGuard>{children}</RouteGuard>
            </div>
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
