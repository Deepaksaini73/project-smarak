import type { Metadata } from "next";
import "./globals.css";
import {bebas,inter,montserrat} from "./fonts"

export const metadata: Metadata = {
  title: "Smarak 2025",
  description: "Annual Civil Engineering Fest of NIT Rourkela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${inter.variable} ${montserrat.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
