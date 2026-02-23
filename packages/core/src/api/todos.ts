import { Effect } from "effect"
import { supabase } from "./supabase"
import { TodoSchema } from "@pkg/types"


export const fetchTodos = (userId: string) => {
    Effect.tryPromise({
        try: async () => {
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .eq("user_id", userId)
            if (error) throw error
            return data.map(todo => TodoSchema.parse(todo))
        },
        catch: (e) => new Error("Failed to fetch todos: ${e}")
    })
}
