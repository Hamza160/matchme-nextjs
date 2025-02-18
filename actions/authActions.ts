"use server";

import bcrypt from 'bcryptjs';
import { ActionResult } from '..';
import { registerSchema, RegisterSchemaType } from "@/lib/schemas/RegisterSchema";
import { AuthError, User } from "next-auth";
import { prisma } from '@/lib/prisma';
import { LoginSchemaType } from '@/lib/schemas/LoginSchema';
import { signIn } from '@/auth';

export const signInUser = async(data:LoginSchemaType): Promise<ActionResult<string>> => {
    try{
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect:false
        })
        console.log(result)
        return {status:'success', data:'Logged in'}
    }catch(error){
        console.log(error)
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return {status:'error', error: 'Invalid Credentails'}
                default:
                    return {status: 'error', error: 'Something went wrong'}
            }
        }
        return {status:'error', error: 'Something else went wrong'}
    }
}

export const registerUser = async(data: RegisterSchemaType): Promise<ActionResult<User>> => {
    try{
        const validated = registerSchema.safeParse(data);

        if(!validated.success){
            return {status:'error', error:validated.error.errors}
        }
        const {name, email, password} = validated.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where:{email}
        })

        if(existingUser) return {status: 'error', error: 'User already exists'}

        const user = await prisma.user.create({
            data:{
                name,
                email,
                passwordHash:hashedPassword
            }
        })
        return {status:'success', data:user}
    }catch(error){
        console.log(error);
        return {status:'error', error:'something went wrong'}
    }
}

export const getUserByEmail = async (email:string) => {
    return prisma.user.findUnique({
        where:{email}
    })
}