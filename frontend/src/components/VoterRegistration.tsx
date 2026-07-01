"use client"

import { useState } from "react"
import { useVotingContract } from "@/hooks/useVotingContract"
import { useVoter } from "@/hooks/useVoter"

export default function VoterRegistration() {
  const { isRegistered } = useVotingContract()
  const { register } = useVoter()

  const [name, setName] = useState("")
  const [age, setAge] = useState(18)
  const [gender, setGender] = useState(0)

  if (isRegistered) {
    return (
      <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg">
        ✔ You are registered to vote
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">

      <h2 className="text-lg font-semibold">
        Register as Voter
      </h2>

      {/* Name */}
      <input
        placeholder="Name"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
        onChange={(e) => setName(e.target.value)}
      />

      {/* Age */}
      <input
        type="number"
        placeholder="Age"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
        onChange={(e) => setAge(Number(e.target.value))}
      />

      {/* Gender */}
      <select
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
        onChange={(e) => setGender(Number(e.target.value))}
      >
        <option value={0}>Not Specified</option>
        <option value={1}>Male</option>
        <option value={2}>Female</option>
        <option value={3}>Other</option>
      </select>

      {/* Register Button */}
      <button
        onClick={() => register(name, age, gender)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
      >
        Register
      </button>

    </div>
  )
}