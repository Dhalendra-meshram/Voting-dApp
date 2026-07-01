import { useAccount, useReadContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export function useVotingContract() {
  const { address } = useAccount()

  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "owner",
  })

  const { data: status } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getVotingStatus", // 
  })

  const { data: isRegistered } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "isVoterRegistered", // 
    args: address ? [address] : undefined,
  })

  const isOwner =
    owner &&
    address &&
    (owner as string).toLowerCase() === address.toLowerCase()

  return {
    owner,
    status: status ?? 0,
    isOwner,
    isRegistered: Boolean(isRegistered), // ✅ FIXED
  }
}