import "./globals.css";
import "./animations.css";
import Script from "next/script";
import { Lilita_One, Roboto_Flex} from 'next/font/google'
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

const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita-one',
  display: 'swap',
})

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="salesfolio">
      <Script defer data-domain={c.plausible_domain} src="https://plausible.io/js/script.tagged-events.js"></Script>
      <body className={`${lilitaOne.variable} ${robotoFlex.variable} flex flex-col w-full`}>
        <AlertProvider>
          {children}
        </AlertProvider>
      </body>
    </html>
  );
}
