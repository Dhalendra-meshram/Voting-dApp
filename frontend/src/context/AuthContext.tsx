"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { api } from "@/lib/axios"

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("token")
    if (stored) {
      setTokenState(stored)
      api.defaults.headers.common["Authorization"] =
        `Bearer ${stored}`
    }
  }, [])

  function setToken(token: string | null) {
    if (token) {
      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] =
        `Bearer ${token}`
    } else {
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
    }
    setTokenState(token)
  }

  function logout() {
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("AuthContext missing")
  return context
}