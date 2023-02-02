import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderDetails.js"
import partRoutes from "./routes/partDetails.js"
import cloudinary from "cloudinary"
import path from "path"
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);


const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use("/api/orders", orderRoutes)
app.use("/api/parts", partRoutes)

//yaha pe start

// app.use(express.static(path.join(__dirname, "build")));

// // Handle all incoming requests
// app.get("/*", (req, res) => {
//   // Serve the index.html file for all routes
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//yaha pe khatam

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
