import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selearn | Platform Belajar Online-mu",
  description:
    "Selearn adalah platform belajar online yang membantu Anda menguasai berbagai keterampilan dengan kursus interaktif, materi lengkap, dan akses mudah di mana saja.",
  keywords: [
    "selearn",
    "platform belajar online",
    "kursus online",
    "belajar interaktif",
    "e-learning",
    "kursus digital",
    "kursus development",
    "kursus developer",
    "kursus digital marketing",
    "kursus matematika",
    "kursus desain grafis",
    "kursus front end developer",
    "kursus back end developer",
    "kursus bisnis",
    "kursus public speaking",
    "kursus akunting",
    "kursus full stack developer",
    "kursus ui/ux design",
  ],
  openGraph: {
    title: "Selearn | Platform Belajar Online-mu",
    description:
      "Belajar lebih mudah dengan Selearn. Nikmati kursus online interaktif, materi lengkap, dan akses fleksibel kapan saja, dan di mana saja.",
    siteName: "Selearn",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster closeButton position="bottom-center" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
