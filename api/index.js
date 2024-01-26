import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user.route.js'
dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
})

app.use('/api/user', router)

app.listen(8000, ()=>{
    console.log('Server running on the port: 3000');
})