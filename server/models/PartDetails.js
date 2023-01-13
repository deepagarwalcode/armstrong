import mongoose from "mongoose";

const PartDetailsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        default: ""
    },
    productCode: {
        type: String,
        required: true,
        default: ""
    },
    productDesc: {
        type: String,
        required: true,
        default: ""
    },
    productFinish: {
        type: String,
        required: true,
        default: ""
    },
    grade: {
        type: String,
        required: true,
        default: ""
    },
    unit: {
        type: String,
        required: true,
        default: ""
    },
    unitPrices: {
        type: String,
        required: true,
        default: ""
    },
    category: {
        type: String,
        required: true,
        default: ""
    },

}, {timestamps: true})

export default mongoose.model("PartDetail", PartDetailsSchema)