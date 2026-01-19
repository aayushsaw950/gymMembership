import mongoose , {Schema} from 'mongoose';

const membershipSchema = new Schema({
    idUser:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    planType:{
        type: String,
        enum : ['monthly' , 'quarterly' , 'yearly'],
        required : true,
    },
    startDate:{
        type: Date,
        required : true,
        default : Date.now,
    },
    expiryDate:{
        type: Date,
    },
    status:{
        type: String,
        enum:['active' , 'expired']
    },
    payment:{
        type: Number,
        required : true,
    },
    paymentMode:{
        type: String,
        enum: ['cash' , 'online']
    },
}, {timestamps:true});

export const Membership = mongoose.model('Membership' , membershipSchema);