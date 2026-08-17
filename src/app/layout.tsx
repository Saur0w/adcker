import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const neueMontreal = localFont({
  src: "../../public/fonts/NeueMontreal.otf",
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adcker",
  description: "~@sauroww(X) @saur0w(GitHub)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={neueMontreal.variable}>
      <body>{children}</body>
    </html>
  );
}
