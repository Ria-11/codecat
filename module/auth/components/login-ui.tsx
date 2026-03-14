"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { GithubIcon } from "lucide-react"

const LoginPage = () => {
  const [loading, setLoading] = useState(false)

  const handleGithubLogin = async () => {
    setLoading(true)
    try {
      await signIn.social({
        provider: "github",
      })
    } catch (error) {
      console.error("Login error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center px-24">
        <div className="mb-10 text-xl font-semibold">
          CodeCat
        </div>

        <h1 className="text-6xl font-bold leading-tight mb-6">
          Cut Code Review <br />
          Time & Bugs in Half. <br />
          Instantly.
        </h1>

        <p className="text-neutral-400 max-w-lg text-lg">
          Supercharge your team to ship faster with AI powered code reviews.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">

        <div className="w-[420px] space-y-6">
          <h2 className="text-3xl font-semibold text-center">
            Welcome Back
          </h2>

          <p className="text-center text-neutral-400 text-sm">
            Login using the following providers:
          </p>

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#E7C7A9] text-black rounded-lg font-medium hover:opacity-90 transition"
          >
            <GithubIcon size={18} />
            {loading ? "Signing in..." : "GitHub"}
          </button>

          <div className="text-center text-sm text-neutral-400">
            New to CodeCat? <span className="underline cursor-pointer">Sign up</span>
          </div>

          <div className="text-center text-xs text-neutral-500">
            Terms of Use • Privacy Policy
          </div>

        </div>

      </div>

    </div>
  )
}

export default LoginPage