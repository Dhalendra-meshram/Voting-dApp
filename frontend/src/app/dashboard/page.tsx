"use client"

import { useCandidates } from "@/hooks/useCandidates"
import CandidateCard from "@/components/CandidateCard"
import VotingStatusBadge from "@/components/VotingStatusBadge"
import CountdownTimer from "@/components/CountdownTimer"
import VoterRegistration from "@/components/VoterRegistration"
import AdminPanel from "@/components/AdminPanel"

export default function Dashboard() {
  const { candidates } = useCandidates()

  return (
    <div className="flex flex-col gap-10">

      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">
          🗳️ Voting Dashboard
        </h1>
        <p className="text-zinc-400">
          Participate in decentralized voting and view candidates.
        </p>
      </div>

      {/* STATUS SECTION */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <VotingStatusBadge />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <CountdownTimer />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <VoterRegistration />
        </div>
      </div>

      {/* ADMIN PANEL */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <AdminPanel />
      </div>

      {/* CANDIDATES */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Candidates
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((c) => (
            <CandidateCard key={c.id} candidate={c} />
          ))}
        </div>
      </div>

    </div>
  )
}