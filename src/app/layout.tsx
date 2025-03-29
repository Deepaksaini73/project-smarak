import type { Metadata } from 'next';
import './globals.css';
import { bebas, inter, montserrat, outfit, quicksand } from './fonts';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import Providers from '@/components/shared/providers';

export const metadata: Metadata = {
  title: 'Smarak 2025',
  description: 'Annual Civil Engineering Fest of NIT Rourkela',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${bebas.variable} ${inter.variable} ${montserrat.variable} ${outfit.variable} ${quicksand.variable}  antialiased`}
      >
        <Toaster position="top-right" />
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
