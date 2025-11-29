import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import AnalyticsClient from "@/components/analytics-client"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "GBV Digital Evidence Vault | Secure Evidence for Survivors",
  description:
    "Empowering survivors of gender-based violence with secure, private, and legally admissible digital evidence. Your files never leave your device.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body data-testim-main-word-scripts-loaded="true" className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {/* Client-only analytics component (prevents SSR/client attribute mismatches) */}
        <AnalyticsClient />
      </body>
    </html>
  )
}
