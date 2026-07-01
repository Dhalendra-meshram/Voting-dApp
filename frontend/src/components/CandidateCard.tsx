"use client"

import { useVote } from "@/hooks/useVote"
import { useVoter } from "@/hooks/useVoter"
import { useVotingStatus } from "@/hooks/useVotingStatus"

type Candidate = {
  id: number
  name: string
  description: string
  image: string
}

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  const { vote, voteCount } = useVote(candidate.id)
  const { isRegistered } = useVoter()
  const status = useVotingStatus()

  const canVote = isRegistered && status === 1

  // ✅ FIX image URL
  let imageUrl = ""

  if (candidate.image?.startsWith("ipfs://")) {
    const cid = candidate.image.replace("ipfs://", "")
    imageUrl = `https://ipfs.io/ipfs/${cid}`
  } else {
    imageUrl = candidate.image || ""
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-indigo-500 transition">

      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={candidate.name}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-3">

        <h2 className="text-xl font-semibold">
          {candidate.name}
        </h2>

        <p className="text-sm text-zinc-400">
          {candidate.description}
        </p>

        <div className="flex justify-between items-center mt-2">

          <div className="text-sm text-zinc-300">
            Votes
            <div className="text-lg font-bold">
              {Number(voteCount ?? 0)}
            </div>
          </div>

          <button
            disabled={!canVote}
            onClick={() => vote(candidate.id)}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-700 disabled:text-zinc-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Vote
          </button>

        </div>

      </div>

    </div>
  )
}