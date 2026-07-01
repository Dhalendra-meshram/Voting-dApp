"use client"

import { useAccount, useSignMessage } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { api } from "@/lib/axios"
import { useAuth } from "@/context/AuthContext"
import { SiweMessage } from "siwe"
import { useEffect, useState } from "react"

export default function ConnectWallet() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { setToken } = useAuth()

  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function login() {
    if (!address) return

    try {
      setLoading(true)

      const nonceRes = await api.get("/auth/nonce")
      const nonce = nonceRes.data.nonce

      const siweMessage = new SiweMessage({
        domain: window.location.hostname,
        address,
        statement: "Sign in to Voting DApp",
        uri: window.location.origin,
        version: "1",
        chainId: 31337,
        nonce,
      })

      const message = siweMessage.prepareMessage()

      const signature = await signMessageAsync({ message })

      const verifyRes = await api.post("/auth/verify", {
        message,
        signature,
      })

      setToken(verifyRes.data.token)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col items-center gap-6 max-w-md w-full">

      {/* Title */}
      <h2 className="text-2xl font-semibold">
        Connect Your Wallet
      </h2>

      <p className="text-zinc-400 text-sm text-center">
        Connect your wallet and sign in using Ethereum to participate in
        decentralized voting.
      </p>

      {/* Wallet Connect */}
      <ConnectButton />

      {/* SIWE Login */}
      {address && (
        <button
          onClick={login}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-700 text-white px-6 py-2 rounded-lg transition font-medium"
        >
          {loading ? "Signing..." : "Sign In with Ethereum"}
        </button>
      )}

    </div>
  )
}