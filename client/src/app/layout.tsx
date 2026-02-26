import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import StyledJsxRegistry from "@/lib/registry";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Lumina LMS - Future of Learning",
  description: "A premium microservices-based Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <StyledJsxRegistry>
          <AuthProvider>
            {children}
          </AuthProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
