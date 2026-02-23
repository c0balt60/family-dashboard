import { z } from 'zod'

export const TodoSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  title: z.string().min(1),
  completed: z.boolean().default(false),
  dueDate: z.iso.datetime().optional(),
  calendarEventId: z.string().optional(),
  createdAt: z.iso.datetime(),
})

export type Todo = z.infer<typeof TodoSchema>
