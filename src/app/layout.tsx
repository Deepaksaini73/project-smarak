import type { Metadata } from 'next';
import './globals.css';
import { bebas, inter, montserrat, outfit, quicksand, opensans } from './fonts';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import Providers from '@/components/shared/providers';
import { generateMetadata } from '@/config/seo';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = generateMetadata();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${bebas.variable} ${inter.variable} ${montserrat.variable} ${outfit.variable} ${quicksand.variable} ${opensans.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              color: '#554400',
              border: '1px solid #e2e8f0',
              padding: '16px',
              fontFamily: 'var(--font-outfit)',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            className: 'font-outfit',
          }}
        />
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
