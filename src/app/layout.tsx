import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "BareMetal Portal",
  description: "Infrastructure management portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-auto bg-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
