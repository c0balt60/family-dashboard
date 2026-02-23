import {supabase, useAuthStore} from "@pkg/core"
import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"

export default function RootLayout() {
    const { session, setSession } = useAuthStore()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        // Get session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_e, session) => setSession(session)
        )

        return () => subscription.unsubscribe()
    }, [])

    // Auth guard
    useEffect(() => {
        const inAuthGroup = segments[0] == '(auth)'
        if (!session && !inAuthGroup) router.replace("/(auth)/login")
        else router.replace("/(app)/todos")

    }, [session, segments])

    return <Slot />
}
