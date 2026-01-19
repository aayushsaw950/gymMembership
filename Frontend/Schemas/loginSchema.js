import {z} from 'zod';

export const loginSchema = z.object({
    username : z.string().min(2 , "username is required"),
    password : z.string().min(6, "Password must be atleast 6 character ")
})