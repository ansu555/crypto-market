import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Fira_Code as FontMono } from "next/font/google"; // Changed to Fira_Code
import { ThemeProvider } from "@/components/theme-provider";
import BackgroundPaths from "@/components/animated-background";
import { Analytics } from "@vercel/analytics/react"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400"],  // Changed from "400" to ["400"]
  variable: "--font-mono",
});

export const metadata = {
  title: "Crypto Market",
  description: "Cryptocurrency market information and tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans relative`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundPaths />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
