import "./globals.css";
import "./animations.css";
import Script from "next/script";
import {AlertProvider} from "@/components/AlertContext";
import c from '@/assets/constants';

export const metadata = {
  metadataBase: new URL('https://mysalesfolio.com'),
  title: {
    template: '%s | SalesFolio',
    default: 'SalesFolio',
  },
  description: "A shareable peer-verified Sales Portfolio designed to help you stand out!",
  keywords: ['sales', 'saas',],
  openGraph: {
    title: 'SalesFolio',
    description: 'A shareable peer-verified Sales Portfolio designed to help you stand out!',
    url: 'https://mysalesfolio.com',
    siteName: 'SalesFolio',
    images: [
      {
        url: '/images/og/og-image-001.png', 
        width: 1200,
        height: 630,
        alt: 'Sales Folio - Stand out from the crowd',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="salesfolio">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <Script defer data-domain={c.plausible_domain} src="https://plausible.io/js/script.tagged-events.js"></Script>
      <body className="flex flex-col w-full">
        <AlertProvider>
          {children}
        </AlertProvider>
      </body>
    </html>
  );
}
