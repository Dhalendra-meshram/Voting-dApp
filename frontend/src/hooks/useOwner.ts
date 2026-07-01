"use client"

import { useAccount, useReadContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export function useOwner() {
  const { address } = useAccount()

  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "owner",
  })

  const isOwner =
    owner &&
    address &&
    (owner as string).toLowerCase() === address.toLowerCase()

  return { owner, isOwner }
}