import { z } from 'zod'

export const FamilyMemberSchema = z.object({
  id: z.uuid(),
  familyId: z.uuid(),
  userId: z.uuid(),
  role: z.enum(['admin', 'member']),
})

export type FamilyMember = z.infer<typeof FamilyMemberSchema>
