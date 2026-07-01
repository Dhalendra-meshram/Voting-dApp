import ConnectWallet from "@/components/ConnectWallet"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-12">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center gap-6 mt-10">
        <h1 className="text-5xl font-bold tracking-tight">
          🗳️ Decentralized Voting DApp
        </h1>

        <p className="text-zinc-400 max-w-xl">
          A secure and transparent blockchain-based voting system built with
          Ethereum, Foundry, Next.js, RainbowKit, SIWE, and IPFS.
        </p>

        <ConnectWallet />

        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-medium"
        >
          Go to Dashboard
        </Link>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">🔐 Secure Voting</h3>
          <p className="text-sm text-zinc-400">
            Votes are stored on blockchain ensuring transparency and tamper-proof elections.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">🌐 Web3 Authentication</h3>
          <p className="text-sm text-zinc-400">
            Sign-In with Ethereum (SIWE) enables secure and decentralized authentication.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">📦 IPFS Storage</h3>
          <p className="text-sm text-zinc-400">
            Candidate data and metadata are stored on IPFS for decentralization.
          </p>
        </div>

      </section>

    </div>
  )
}