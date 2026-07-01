"use client"

import { useEffect, useState } from "react"
import { createPublicClient, http, parseAbiItem } from "viem"
import { CONTRACT_ADDRESS } from "@/lib/contract"
import { anvil } from "@/lib/wagmi"

type Candidate = {
  id: number
  candidateAddress: string
  name: string
  description: string
  image: string
}

const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
})

export function useCandidates() {

  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let mounted = true

    async function loadCandidates() {

      try {

        const logs = await publicClient.getLogs({
          address: CONTRACT_ADDRESS,

          event: parseAbiItem(
            "event CandidateRegistered(uint indexed candidateId, address indexed candidateAddress, string metadataCid)"
          ),

          fromBlock: 0n,
          toBlock: "latest",
        })

        const parsed = await Promise.all(

          logs.map(async (log: any) => {

            const cid = log.args.metadataCid
            const id = Number(log.args.candidateId)

            try {

              console.log("Fetching CID:", cid)

              // ✅ Reliable IPFS gateways
              const gateways = [
                "https://gateway.pinata.cloud/ipfs/",
                "https://ipfs.io/ipfs/",
              ]

              let metadata: any = null

              for (const gateway of gateways) {

                try {

                  const res = await fetch(`${gateway}${cid}`)

                  if (!res.ok) continue

                  const text = await res.text()

                  try {

                    metadata = JSON.parse(text)

                    console.log("Metadata loaded:", metadata)

                    break

                  } catch {

                    console.warn("Invalid JSON from:", gateway)

                  }

                } catch {

                  console.warn("Gateway failed:", gateway)

                }
              }

              if (!metadata) {
                throw new Error("All gateways failed")
              }

              return {
                id,
                candidateAddress: log.args.candidateAddress,

                name:
                  metadata?.name || "Candidate",

                description:
                  metadata?.description ||
                  "No description available",

                image:
                  metadata?.image || "",
              }

            } catch (err) {

              console.error(
                "Metadata fetch failed:",
                err
              )

              return {
                id,
                candidateAddress: log.args.candidateAddress,

                name: "Candidate",

                description:
                  "Metadata failed to load",

                image: "",
              }
            }
          })
        )

        if (mounted) {
          setCandidates(parsed)
        }

      } catch (err) {

        console.error(
          "Failed to load candidates:",
          err
        )

      } finally {

        if (mounted) {
          setLoading(false)
        }
      }
    }

    // ✅ Initial load
    loadCandidates()

    // 🔥 REAL-TIME EVENT LISTENER
    const unwatch = publicClient.watchEvent({

      address: CONTRACT_ADDRESS,

      event: parseAbiItem(
        "event CandidateRegistered(uint indexed candidateId, address indexed candidateAddress, string metadataCid)"
      ),

      onLogs: () => {

        console.log("🔥 New candidate detected")

        loadCandidates()
      },
    })

    // 🧹 Cleanup
    return () => {

      mounted = false

      unwatch()
    }

  }, [])

  return {
    candidates,
    loading,
  }
}