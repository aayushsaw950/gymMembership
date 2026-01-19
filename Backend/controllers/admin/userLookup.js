import User from "../../models/user";
import { Membership } from "../../models/memberShip";

const userLookup = async (req, res) => {
    const {email , phone} = req.query;
    const user = await User.findOne({$or: [{email}, {phone}]});
    if(!user){
        return res.status(404).json({message : "User not found"});
    }
    const membership = await Membership.findOne({userId : user._id});
    if(!membership){
        return res.status(404).json({message : "Membership not found for this user" , user});
    }
    res.status(200).json({user , membership});
};