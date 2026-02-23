import { GoogleSignInError, signInWithGoogle } from "@pkg/core";
import { useState } from "react";
import { Effect, Runtime } from "effect";

const runtime = Runtime.defaultRuntime

export default function LoginScreen() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleGoogleLogin = () => {
        setLoading(true)
        const program = signInWithGoogle(process.env.PUBLIC_AUTH_REDIRECT_URL!)
        .pipe(
            Effect.tapError((e) =>
                Effect.sync(() => {
                    if (e instanceof GoogleSignInError) setError(e.message)
                })
            ),
            Effect.acquireRelease(
                () => Effect.sync(() => setLoading(false))
            )
        ) as Effect.Effect<never, GoogleSignInError, never>

        Runtime.runFork(runtime, program)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold mb-2">Family App</h1>
        <p className="text-gray-500 mb-10">Sign in to get started</p>

        {error && (
            <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}

        <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center gap-3 bg-white border border-gray-300 rounded-xl px-6 py-4 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
            <>
                <span className="text-base font-medium text-gray-700">
                Continue with Google
                </span>
            </>
            )}
        </button>
        </div>
    )
}
