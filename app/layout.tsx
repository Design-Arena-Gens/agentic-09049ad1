import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const display = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  subsets: ["latin"]
});

const body = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-body",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Aura AI Studio",
  description:
    "Agent تصميم ذكي لإنشاء محتوى سوشيال ميديا، لوجوهات، هوية بصرية وفيديوهات احترافية مع محادثة مباشرة."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
