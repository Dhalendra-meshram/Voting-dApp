"use client"

import { useState } from "react"
import { api } from "@/lib/axios"
import { useVotingContract } from "@/hooks/useVotingContract"
import { useWriteContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export default function AdminPanel() {
  const { isOwner } = useVotingContract()

  // ✅ IMPORTANT FIX
  const { writeContractAsync } = useWriteContract()

  const [candidateAddress, setCandidateAddress] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageCid, setImageCid] = useState("")
  const [loading, setLoading] = useState(false)

  const [startOffset, setStartOffset] = useState(0)
  const [duration, setDuration] = useState(3600)

  if (!isOwner) return null

  // 🔥 CREATE CANDIDATE
  async function createCandidate() {
    try {
      if (!candidateAddress || !name || !description || !imageCid) {
        alert("Fill all fields")
        return
      }

      setLoading(true)

      const metadata = {
        name,
        description,
        image: `ipfs://${imageCid}`,
      }

      await api.post("/candidate/create", {
        candidateAddress,
        metadata,
      })

      alert("Candidate created ✅")

    } catch (err: any) {
      console.error(err)

      alert(
        err?.response?.data?.error ||
        err?.message ||
        "Failed to create candidate ❌"
      )

    } finally {
      setLoading(false)
    }
  }

  // 🔥 SET VOTING PERIOD
  async function setVotingPeriod() {
    try {
      console.log("Setting voting period...")

      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "setVotingPeriod",
        args: [startOffset, duration],
      })

      console.log("Transaction hash:", hash)

      alert("Voting period transaction submitted ✅")

    } catch (err: any) {
      console.error("Voting period failed:", err)

      alert(
        err?.shortMessage ||
        err?.message ||
        "Transaction failed ❌"
      )
    }
  }

  return (
    <div className="flex flex-col gap-8">

      <h2 className="text-xl font-semibold">
        Admin Panel
      </h2>

      {/* CREATE CANDIDATE */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm text-zinc-400">
          Create Candidate
        </h3>

        <input
          placeholder="Candidate Address"
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setCandidateAddress(e.target.value)}
        />

        <input
          placeholder="Name"
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Description"
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Image CID"
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setImageCid(e.target.value)}
        />

        <button
          onClick={createCandidate}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 text-white py-2 rounded-lg font-medium transition"
        >
          {loading ? "Creating..." : "Create Candidate"}
        </button>
      </div>

      {/* VOTING PERIOD */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm text-zinc-400">
          Voting Period
        </h3>

        <input
          type="number"
          placeholder="Start Offset (seconds)"
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setStartOffset(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Duration (seconds)"
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <button
          onClick={setVotingPeriod}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
        >
          Set Voting Period
        </button>
      </div>

    </div>
  )
}