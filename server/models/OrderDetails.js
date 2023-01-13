import mongoose from "mongoose";

const OrderDetailsSchema = new mongoose.Schema({
    contactPersonName: {
        type: String,
        required: true,
        default: ""
    },
    organisation: {
        type: String,
        required: true,
        default: ""
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    pipeline: {
        type: String,
        required: true,
        default: ""
    },
    probability: {
        type: String,
        required: true,
        default: ""
    },
    expectedCloseDate: {
        type: String,
        required: true,
        default: ""
    },
    offerReferenceNumber: {
        type: String,
        required: true,
        default: ""
    },
    orderIn: {
        type: String,
        required: true,
        default: ""
    },
    value: {
        type: Number,
        required: true,
        default: 0
    },
    valuePartsDistribution: {
        type: Array,
        required: true,
        default: [],
    },
    won:{
        type: Boolean,
        required: true,
        default: false
    },
    lost:{
        type: Boolean,
        required: true,
        default: false
    }

}, {timestamps: true})

export default mongoose.model("OrderDetail", OrderDetailsSchema)