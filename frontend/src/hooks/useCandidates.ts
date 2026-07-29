"use client"

import { useEffect, useState } from "react"
import { createPublicClient, http } from "viem"
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "@/lib/contract"
import { sepolia } from "wagmi/chains"

type Candidate = {
  id: number
  candidateAddress: string
  name: string
  description: string
  image: string
}

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
})

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadCandidates() {
      try {
        const nextCandidateId = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "nextCandidateId",
        })

        const totalCandidates = Number(nextCandidateId) - 1

        if (totalCandidates <= 0) {
          if (mounted) {
            setCandidates([])
            setLoading(false)
          }
          return
        }

        const parsed = await Promise.all(
          Array.from(
            { length: totalCandidates },
            async (_, index): Promise<Candidate> => {
              const id = index + 1

              const result = await publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "getCandidate",
                args: [BigInt(id)],
              })

              const [
                candidateAddress,
                metadataCid,
              ] = result as [string, string, bigint]

              const gateways = [
                "https://gateway.pinata.cloud/ipfs/",
                "https://ipfs.io/ipfs/",
              ]

              let metadata: any = null

              for (const gateway of gateways) {
                try {
                  const res = await fetch(`${gateway}${metadataCid}`)

                  if (!res.ok) continue

                  metadata = await res.json()
                  break
                } catch {
                  // Try next gateway
                }
              }

              return {
                id,
                candidateAddress,
                name: metadata?.name ?? "Candidate",
                description:
                  metadata?.description ??
                  "No description available",
                image: metadata?.image ?? "",
              }
            }
          )
        )

        parsed.sort((a, b) => a.id - b.id)

        if (mounted) {
          setCandidates(parsed)
        }
      } catch (err) {
        console.error("Failed to load candidates:", err)

        if (mounted) {
          setCandidates([])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadCandidates()

    return () => {
      mounted = false
    }
  }, [])

  return {
    candidates,
    loading,
  }
}