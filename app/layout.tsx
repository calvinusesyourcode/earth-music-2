'use client';

import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect } from "react";

const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon16x16.png",
    apple: "/minecraft192.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          }, 
          function(err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  },[])
  
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head>
        <title>{"earth-music"}</title>
        <meta name="description" content={"Theme music for life on earth."} />
        <meta name="theme-color" media={"(prefers-color-scheme: light)"} content={"white"} />
        <meta name="theme-color" media={"(prefers-color-scheme: dark)"} content={"black"} />
        <link rel="icon" href={"/favicon.ico"} />
        <link rel="shortcut icon" href={"/favicon16x16.png"} />
        <link rel="apple-touch-icon" sizes="192x192" href={"/minecraft192.png"} />
        <link rel="manifest" href="/manifest.json" />
      </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
