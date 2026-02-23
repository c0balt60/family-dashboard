import { create } from "zustand"
import { supabase } from "../api/supabase"
import type { Session, User } from "@supabase/supabase-js"

interface AuthStore {
    session: Session | null
    user: User | null
    isLoading: boolean
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
    setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    session: null,
    user: null,
    isLoading: true,

    setSession: (session) => set({
        session,
        user: session?.user ?? null,
        isLoading: false
    }),

    signInWithGoogle: async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                scopes: "https://www.googleapis.com/auth/calendar",
                redirectTo: process.env.PUBLIC_AUTH_REDIRECT_URL
            }
        })
    },

    signOut: async () => {
        await supabase.auth.signOut()
        set({ session: null, user: null })
    }
}))
