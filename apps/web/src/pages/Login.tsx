import { useAuthStore } from "@pkg/core";

export default function Login() {
    const { signInWithGoogle } = useAuthStore()


    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-8">Family App</h1>
        <button
            onClick={signInWithGoogle}
            className="px-6 py-3 border rounded-xl shadow-sm hover:bg-gray-50"
        >
            Continue with Google
        </button>
        </div>
    )
}
