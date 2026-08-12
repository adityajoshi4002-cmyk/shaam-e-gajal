import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "शाम-ए-ग़ज़ल — A Quiet Mehfil",
  description:
    "A nostalgic digital mehfil for classic Urdu ghazals. Sit, listen, and let the music take you back. Featuring Jagjit Singh, Mehdi Hassan, Ghulam Ali, and more.",
  keywords: [
    "ghazal",
    "urdu ghazal",
    "jagjit singh",
    "mehdi hassan",
    "ghulam ali",
    "shaam-e-ghazal",
    "classic ghazals",
    "indian music",
    "mehfil",
  ],
  openGraph: {
    title: "शाम-ए-ग़ज़ल — A Quiet Mehfil",
    description:
      "A nostalgic digital mehfil for classic Urdu ghazals. Sit, listen, and let the music take you back.",
    type: "website",
    locale: "hi_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "शाम-ए-ग़ज़ल",
    description: "A quiet digital mehfil for classic ghazals.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0803",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${inter.variable} ${notoSerifDevanagari.variable}`}>
      <body className="antialiased overflow-hidden">{children}</body>
    </html>
  );
}
