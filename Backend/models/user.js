import mongoose , {Schema} from 'mongoose';

const userSchema = new Schema({
    username:{
        type : String,
        required :true,
        unique : true,
    }, 
    email:{
        type : String,
        required :true,
        unique : true,
    },
    // phone :{
    //     type: number,
    //     required : true,
    //     unique : true,
    //     max: 10
    // },
    password:{
        type : String,
        required :true,
    },
    createdAt:{
        type: Date,
        default : Date.now,
    },
} , {timestamps:true});

const User =  mongoose.model('User' , userSchema);
export default User;