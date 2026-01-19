import {z} from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3, "invalid username"),
    email: z.email(),
    password: z.string().min(6, "password must be atleast 6 characters"),
})