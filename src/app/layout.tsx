import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/share/providers/QueryProvider";
import { Toaster } from "sonner";


const baseUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return new URL(`https://${vercelUrl}`);

  return new URL("http://localhost:3000");
})();

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: "Paraf - Product Page",
  description: "Building better products for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      {/* flex min-h-screen flex-col font-vazirmatn */}
      <body className={`${vazirmatn.variable} font-vazirmatn`}>
        <QueryProvider>
          {children}
        </QueryProvider>
         <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
