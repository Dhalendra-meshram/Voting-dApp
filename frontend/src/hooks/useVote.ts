import { useWriteContract, useReadContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export function useVote(candidateId?: number) {
  const { writeContract } = useWriteContract()

  const { data: voteCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getVoteCount",
    args: candidateId ? [candidateId] : undefined,
  })

  function vote(id: number) {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "castVote",
      args: [id],
    })
  }

  return { vote, voteCount }
}
