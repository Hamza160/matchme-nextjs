import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message:"Password must be atleast 6 characters"
    })
})

export type LoginSchemaType = z.infer<typeof loginSchema>