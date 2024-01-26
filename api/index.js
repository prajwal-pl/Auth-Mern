import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
})

app.use('/api/user', router)
app.use('/auth/user', authRoute)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

app.listen(8000, ()=>{
    console.log('Server running on the port: 3000');
})