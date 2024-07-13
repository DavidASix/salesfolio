import "./globals.css";

export const metadata = {
  title: "Sales Folio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="salesfolio">
      <body className="flex flex-col w-full">
          {children}
      </body>
    </html>
  );
}
