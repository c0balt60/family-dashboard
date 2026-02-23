import { supabase } from "@pkg/core"
import { useLinkingURL } from "expo-linking"
import { useRouter } from "expo-router"
import { useEffect } from "react"

export default function AuthCallback() {
    const url = useLinkingURL()
    const router = useRouter()

    useEffect(() => {
        if (!url) return
        supabase.auth.exchangeCodeForSession(url)
        router.replace("/(app)/todos")
    }, [url])

    return null
}
