import { Admin } from "../models/admin.js";
import bcrypt from "bcrypt";

export const createAdmin  =  async(username ,email , password , role = 'superadmin')=>{
    const existingAdmin = await Admin.findOne({$or: [{username}, {email}]});
    if(existingAdmin){
        throw new Error('Admin with given username or email already exists');
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const newAdmin = new Admin({
        username,   
        email,
        password : hashedPassword,
        role,
    });
    await newAdmin.save();
    console.log('New admin created:', newAdmin);
    return newAdmin;
}