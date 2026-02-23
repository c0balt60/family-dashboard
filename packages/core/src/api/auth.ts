import { Effect } from "effect"
import { supabase } from "./supabase"


export class GoogleSignInError {
    readonly _tag = "GoogleSignInError"
    constructor(readonly message: string) { }
}

export const signInWithGoogle = (redirectTo: string) =>
    Effect.tryPromise({
        try: () => supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar',
                redirectTo
            }
        }),
        catch: (e) => new GoogleSignInError("Google sign in failed: ${e}")
    }).pipe(
        Effect.flatMap(({ error }) =>
            error
                ? Effect.fail(new GoogleSignInError(error.message))
                : Effect.succeed(void 0)
        )
    )
