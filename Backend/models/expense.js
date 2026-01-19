import mongooe,{ Schema } from 'mongoose';

const expenseSchema = new Schema({
    title:{
        type: String,
        required: true,
        enum:['Equipment', 'Maintenance', 'Rent', 'Utilities', 'Salaries', 'Marketing', 'Miscellaneous'],
    },
    amount:{
        type: Number,
        required: true,
        min: 0,
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
}, {timestamps:true});

export const Expense = mongoose.model('Expense' , expenseSchema);