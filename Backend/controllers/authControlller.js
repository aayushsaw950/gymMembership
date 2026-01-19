
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req , res) => {
        const {username , email , password} = req.body;
        const exisitngUserByUsername = await User.findOne({username});
        if(exisitngUserByUsername){
            return res.status(400).json({message : "Username already exists"});
        }
        const exisitingUserByEmail = await User.findOne({email});
            if(exisitingUserByEmail){
                return res.status(400).json({message : "Email already exists"});
            }else {
                try{
                    const hashedPassword = await bcrypt.hash(password , 10);
                    const newUser = new User({
                        username,
                        email,
                        
                        password : hashedPassword,
                    });

                    await newUser.save();

                    const token = jwt.sign({
                        userId: newUser._id,
                        username: newUser.username,
                    } , JWT_SECRET , {expiresIn : '7d'
                    });

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                    })
                    res.status(201).json({message : "Signup Successfully" , user: newUser});
                } catch (error){
                    res.status(500).json({message : "Internal server error"});
                }
            }

}

export const login = async (req,res) =>{
    const {username , password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message : "Invalid username or password"});
        }
        const isPasswordValid =  await bcrypt.compare(password , user.password);
        if(!isPasswordValid){
            return res.status(400).json({message : "Invalid username or password"});
        }
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        } , JWT_SECRET , {expiresIn : '7d'
        });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        res.status(200).json({message : "Login successful" , user});
    } catch (error){
        res.status(500).json({message : "Internal server error"});
    }

}

export const logout = (req , res) =>{
    res.clearCookie('token');
    res.status(200).json({message : "Logout successful"});  
}

export const getUser = (req, res) =>{
    res.status(200).json(req.data.user);
}