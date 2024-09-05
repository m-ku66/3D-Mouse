import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./interface components/ThemeProvider";
import "./globals.css";
import "./anims.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mouse Interactions",
  description: "3D web mouse interactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
