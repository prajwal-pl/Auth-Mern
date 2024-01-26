import { Mongoose } from "mongoose";

const Schema = new Mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
}, {timestamps: true})

const User = Mongoose.model('User', Schema)

export default User