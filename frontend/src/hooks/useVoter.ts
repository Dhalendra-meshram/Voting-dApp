import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi"

import { useEffect } from "react"

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI
} from "@/lib/contract"

export function useVoter() {
  const { address } = useAccount()

  // ✅ READ VOTER STATUS
  const {
    data: isRegistered,
    refetch
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "isVoterRegistered",
    args: address ? [address] : undefined,
  })

  // ✅ WRITE CONTRACT
  const {
    writeContractAsync
  } = useWriteContract()

  // 🔥 REGISTER FUNCTION
  async function register(
    name: string,
    age: number,
    gender: number
  ) {
    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "registerVoter",
        args: [name, age, gender],
      })

      console.log("Registration TX:", hash)

      // 🔥 wait a little then refresh state
      setTimeout(() => {
        refetch()
      }, 1500)

      alert("Voter registered ✅")

    } catch (err: any) {
      console.error(err)

      alert(
        err?.shortMessage ||
        err?.message ||
        "Registration failed ❌"
      )
    }
  }

  // 🔥 auto refresh when wallet changes
  useEffect(() => {
    refetch()
  }, [address])

  return {
    isRegistered,
    register
  }
}