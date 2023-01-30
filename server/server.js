import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderDetails.js"
import partRoutes from "./routes/partDetails.js"
import cloudinary from "cloudinary"


const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use("/api/orders", orderRoutes)
app.use("/api/parts", partRoutes)

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("connected to db");
    })
    .catch(err => {
        console.log(err);
    })
} 

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
  })

app.post("/test", async(req, res) => {
    try{
        console.log(req.body);
        res.status(200).json({success: "true"})
    }catch(err){
        console.log(err);
    }
})

app.listen(8800, () => {
    connect()
    console.log("connected to server");
})
