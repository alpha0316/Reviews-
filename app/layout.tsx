import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { IconProvider } from "@/components/IconProvider";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ofie",
  description: "Anonymous, evidence-backed reviews for Accra & Kumasi",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1613" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${familjenGrotesk.variable} ${figtree.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="h-svh overflow-hidden flex flex-col bg-bg text-ink font-body">
        <IconProvider>
          <div className="mx-auto flex h-svh w-full max-w-[480px] flex-col bg-bg">
            <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
            <BottomNav />
          </div>
        </IconProvider>
      </body>
    </html>
  );
}
