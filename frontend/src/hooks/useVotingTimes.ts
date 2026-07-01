import { useReadContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export function useVotingTimes() {
  const { data: startTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "startTime",
  })

  const { data: endTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "endTime",
  })

  return {
    startTime: Number(startTime ?? 0),
    endTime: Number(endTime ?? 0),
  }
}