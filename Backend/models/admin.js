import mongoose , {Schema} from "mongoose";

const adminSchema = new Schema({
    username : {
        type: String,
        required : true,
        unique : true,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    phone :{
        type: Number,
        required : true,
        unique : true,
        max: 10
    },
    password:{
        type : String,
        required : true,
    },
    role : {
        type: String,
        enum : ['admin' , 'superadmin'],
        default : 'admin',
    },
    createdAt:{
        type: Date,
        default : Date.now,
    }
}, {timestamps:true})

export const Admin = mongoose.model('Admin' , adminSchema);