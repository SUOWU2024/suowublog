import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suowu.org"),
  title: {
    default: "Suowu's Garden",
    template: "%s - Suowu's Garden",
  },
  description: "一个会慢慢生长的个人数字花园",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://suowu.org",
    siteName: "Suowu's Garden",
    title: "Suowu's Garden",
    description: "一个会慢慢生长的个人数字花园",
  },
  twitter: {
    card: "summary",
    title: "Suowu's Garden",
    description: "一个会慢慢生长的个人数字花园",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        />
      </head>
      <body className={`${lora.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
