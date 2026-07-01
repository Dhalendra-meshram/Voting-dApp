"use client"

import { useMemo } from "react"
import { useCandidates } from "@/hooks/useCandidates"
import { useVote } from "@/hooks/useVote"

export default function Results() {

  const { candidates, loading } = useCandidates()

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading results...
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-10">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          🏆 Election Results
        </h1>

        <p className="text-zinc-400 mt-2">
          Final decentralized voting outcome
        </p>
      </div>

      <WinnerSection candidates={candidates} />

    </div>
  )
}

function WinnerSection({ candidates }: any) {

  // 🔥 collect vote counts
  const results = candidates.map((candidate: any) => {
    const { voteCount } = useVote(candidate.id)

    return {
      ...candidate,
      votes: Number(voteCount ?? 0),
    }
  })

  // 🔥 highest votes
  const maxVotes = Math.max(
    ...results.map((c: any) => c.votes),
    0
  )

  // 🔥 winners
  const winners = results.filter(
    (c: any) => c.votes === maxVotes && maxVotes > 0
  )

  // 🔥 tie check
  const isTie = winners.length > 1

  if (maxVotes === 0) {
    return (
      <div className="text-zinc-400">
        No votes cast yet.
      </div>
    )
  }

  if (isTie) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center">

        <h2 className="text-3xl font-bold mb-6">
          🤝 It's a Tie!
        </h2>

        <div className="flex flex-col gap-6">

          {winners.map((candidate: any) => (

            <div key={candidate.id}>

              <img
                src={candidate.image.replace(
                  "ipfs://",
                  "https://gateway.pinata.cloud/ipfs/"
                )}
                alt={candidate.name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />

              <h3 className="text-2xl font-bold">
                {candidate.name}
              </h3>

              <p className="text-zinc-400">
                {candidate.votes} votes
              </p>

            </div>

          ))}

        </div>

      </div>
    )
  }

  const winner = winners[0]

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center max-w-md w-full">

      <img
        src={winner.image.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        )}
        alt={winner.name}
        className="w-40 h-40 rounded-full object-cover mx-auto mb-6"
      />

      <h2 className="text-xl text-zinc-400 mb-3">
        Winner
      </h2>

      <p className="text-4xl font-bold">
        {winner.name}
      </p>

      <p className="text-zinc-400 mt-3">
        {winner.description}
      </p>

      <div className="mt-6">

        <p className="text-zinc-400 text-sm">
          Total Votes
        </p>

        <p className="text-5xl font-bold">
          {winner.votes}
        </p>

      </div>

    </div>
  )
}