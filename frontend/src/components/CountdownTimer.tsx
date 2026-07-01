"use client"

import { useEffect, useState } from "react"
import { useVotingTimes } from "@/hooks/useVotingTimes"

export default function CountdownTimer() {
  const { startTime, endTime } = useVotingTimes()
  const [now, setNow] = useState(Date.now() / 1000)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now() / 1000)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!startTime) return null

  const target = now < startTime ? startTime : endTime
  const remaining = Math.max(target - now, 0)

  const hours = Math.floor(remaining / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = Math.floor(remaining % 60)

  return (
    <div className="flex flex-col items-center text-center gap-3">

      {/* Title */}
      <p className="text-sm text-zinc-400">
        {now < startTime ? "Voting Starts In" : "Voting Ends In"}
      </p>

      {/* Timer */}
      <div className="flex gap-4 text-2xl font-bold">

        <div className="bg-zinc-800 px-4 py-2 rounded-lg">
          {hours}
          <div className="text-xs text-zinc-400 font-normal">hrs</div>
        </div>

        <div className="bg-zinc-800 px-4 py-2 rounded-lg">
          {minutes}
          <div className="text-xs text-zinc-400 font-normal">min</div>
        </div>

        <div className="bg-zinc-800 px-4 py-2 rounded-lg">
          {seconds}
          <div className="text-xs text-zinc-400 font-normal">sec</div>
        </div>

      </div>

    </div>
  )
}