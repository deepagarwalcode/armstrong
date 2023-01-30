import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
    won: [
        {
            locationNumber: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ]
    

}, {timestamps: true})

export default mongoose.model("Analytics", AnalyticsSchema)