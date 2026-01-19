import User from "../../models/user";
import bcrypt from "bcrypt";
export const createUser = async (req, res) => {
    const {username , email , phone , password} =req.body;
    const exisitngUserByUsername = await User.findOne({username});

    if(exisitngUserByUsername){
        return res.status(400).json({message : "Username already exists"});
    }
    const exisitingUserByEmail = await User.findOne({email});
        if(exisitingUserByEmail){
            return res.status(400).json({message : "Email already exists"});
        }
    const exisitingUserByPhone = await User.findOne({phone});
        if(exisitingUserByPhone){
            return res.status(400).json({message : "Phone number already exists"});
        }
    const hashedPassword = await bcrypt.hash(password , 10);

    try{
        const newUser = new User ({
            username,
            email,
            phone,
            password: hashedPassword
        })

        await newUser.save();
        res.status(201).json({message : "User created successfully" , user : newUser});
        // redirect('/admin/dashboard');
    } catch (error){
        res.status(500).json({message : "Internal server error" , error : error.message});
    }

};

