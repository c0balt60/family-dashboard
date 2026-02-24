import { supabase, useAuthStore } from "@pkg/core";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";


export default function App() {
    const { session, setSession, isLoading } = useAuthStore()

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

    if (isLoading) return <SplashScreen />

    return (
        <BrowserRouter>
            <Routes>
                {!session ? (
                    <>
                        <Route path="/login" element={ <Login/> } />
                    </>
                ) : (
                        <>
                            <Route path="*" element={<Navigate to={"/todos"} replace />} />
                            <Route path="/auth/callback" element={<AuthCallback/>}/>
                        </>
                )}
            </Routes>
        </BrowserRouter>
    )
}

function SplashScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )
}

function AuthCallback() {
  useEffect(() => {
    supabase.auth.exchangeCodeForSession(window.location.href)
  }, [])

  return <SplashScreen />
}
