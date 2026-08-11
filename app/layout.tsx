import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { CartProvider } from "@/lib/cart-context";



const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fureve | Fine & Custom Jewelry",
  description:
    "Fureve creates fine and custom jewelry pieces, crafted to tell your story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </body>

    </html>
  );
}
