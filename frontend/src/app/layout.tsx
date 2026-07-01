"use client"

import "@rainbow-me/rainbowkit/styles.css"
import "./globals.css"

import { WagmiProvider } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { config } from "@/lib/wagmi"
import { AuthProvider } from "@/context/AuthContext"

import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white min-h-screen">

        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <RainbowKitProvider>
              <AuthProvider>

                {/* NAVBAR */}
                <nav className="border-b border-zinc-800 bg-zinc-950/70 backdrop-blur sticky top-0 z-50">
                  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                      href="/"
                      className="text-xl font-bold tracking-tight"
                    >
                      🗳️ Voting DApp
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6 text-sm text-zinc-300">

                      <Link
                        href="/dashboard"
                        className="hover:text-white transition"
                      >
                        Dashboard
                      </Link>

                      <Link
                        href="/result"
                        className="hover:text-white transition"
                      >
                        Results
                      </Link>

                      <ConnectButton showBalance={false} />

                    </div>
                  </div>
                </nav>

                {/* PAGE CONTENT */}
                <main className="max-w-7xl mx-auto px-6 py-10">
                  {children}
                </main>

              </AuthProvider>
            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>

      </body>
    </html>
  )
}