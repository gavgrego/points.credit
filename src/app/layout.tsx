import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Transfer Guide',
  description: 'Credit card points transfer guide',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-578C069X6P"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', 'G-578C069X6P');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
