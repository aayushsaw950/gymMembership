
import { Admin } from "../models/admin.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET

export const adminRegister = async (req , res) => {
    const {username , email , password, role} = req.body;
    const exisitngAdminByUsername = await Admin.findOne({username});
    if(exisitngAdminByUsername){
        return res.status(400).json({message : "Username already exists"});
    }
    const existingAdminByEmail = await Admin.findOne({email});
        if(existingAdminByEmail){
            return res.status(400).json({message : "Email already exists"});
        } else {
            try{
                const hashedPassword = await bcrypt.hash(password , 10);
                const newAdmin = new Admin({
                    username,
                    email,
                    password : hashedPassword,
                    role : 'admin',

                });
                await newAdmin.save();

                // const token = jwt.sign({
                //     adminId : newAdmin._id,
                //     username: newAdmin.username,
                //     role: newAdmin.role,
                // }, JWT_SECRET,{expiresIn : '7d'}
                // );

                // res.cookie('token', token,{
                //     httpOnly: true,
                //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                // })
                res.status(201).json({message : "Admin registered successfully" , admin: newAdmin
                })

            } catch (error){
                res.status(500).json({message : "Internal server error"});          

        }
    }
}

export const adminLogin = async (req,res) =>{
    const {username , password} = req.body;
    try{
        const admin = admin.findOne({username});
        if(!admin){
            res.status(400).json({message : "Invalid username or password"});
        }

        const isPasswordValid =  await bcrypt.compare(password , admin.password);
        if(!isPasswordValid){
            res.status(400).json({message : "Invalid username or password"});
        }
        const token = jwt.sign({
            adminId : admin._id,
            username: admin.username,
            role: admin.role,
        } , JWT_SECRET , {expiresIn : '7d'}  
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        res.status(200).json({message : "Admin logged in successfully" , admin: admin});
    } catch (error){
        res.status(500).json({message : "Internal server error"});
    }
}

export const adminLogout = (req,res) =>{
    res.clearCookie('token');
    res.status(200).json({message : "Admin logged out successfully"});

}