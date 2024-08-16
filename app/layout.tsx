import "./globals.css";
import {AlertProvider} from "@/components/AlertContext";

export const metadata = {
  title: "Sales Folio",
  description: "",
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
      <body className="flex flex-col w-full">
        <AlertProvider>
          {children}
        </AlertProvider>
      </body>
    </html>
  );
}
