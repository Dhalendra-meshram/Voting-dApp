"use client"

import { useVotingContract } from "@/hooks/useVotingContract"

export default function VotingStatusBadge() {
  const { status } = useVotingContract()

  const labels = ["Not Started", "In Progress", "Ended"]
  const colors = [
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "bg-green-500/20 text-green-400 border-green-500/30",
    "bg-red-500/20 text-red-400 border-red-500/30",
  ]

  const statusIndex = Number(status ?? 0)

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-400">
        Voting Status
      </span>

      <span
        className={`px-3 py-1 text-sm rounded-full border font-medium ${
          colors[statusIndex] ?? "bg-zinc-800 text-zinc-300 border-zinc-700"
        }`}
      >
        {labels[statusIndex] ?? "Unknown"}
      </span>
    </div>
  )
}