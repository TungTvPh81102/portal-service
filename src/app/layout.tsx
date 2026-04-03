import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BeeVietnamPro } from "@/components/common/bee-vietnam-pro";
import AppProvider from "@/providers/app-provider";

export const metadata: Metadata = {
  title: "ITSM Portal - Dashboard",
  description:
    "IT Service Management Portal - Manage tickets, incidents, and service requests efficiently",
  generator: "Next.js",
  keywords: ["ITSM", "IT Service Management", "Help Desk", "Ticket System", "ITIL"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${BeeVietnamPro.variable} font-sans antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
