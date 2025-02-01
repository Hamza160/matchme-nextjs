import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/schemas/LoginSchema"
import { compare } from "bcryptjs"
import { getUserByEmail } from "./actions/authActions"
 
export default { providers: [Credentials({
    name: 'credentials',
    async authorize(credentials){
        const validted = loginSchema.safeParse(credentials)
        if(validted.success){
            const {email, password} = validted.data
            const user = await getUserByEmail(email)
            if(!user || !(await compare(password, user.passwordHash))) return null;
            return user;
        }
        return null
    }
})] } satisfies NextAuthConfig