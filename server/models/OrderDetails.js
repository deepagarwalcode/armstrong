import mongoose from "mongoose";

const OrderDetailsSchema = new mongoose.Schema({
    contactPersonName: {
        type: String,
        required: true,
        default: ""
    },
    locationNumber: {
        type: String,
        required: true,
        unique: true,
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
    wonValue: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: "open"
    },
    valuePartsDistribution: [
        {
            name:{
                type:String,
                required:true,
                default:""
            },
            price:{
                type: String,
                required: true,
                default: "0"
            },
            cprice:{
                type: String,
                required: true,
                default: "0"
            },
            quantity: {
                type: String,
                required: true,
                default: ""
            },
            vat:{
                type: String,
                required: true,
                default: "0"
            },
            total:{
                type: String,
                required: true,
                default: "0"
            },
            open:{
                type: String,
                required: true,
                default: "0"
            },
            won:{
                type: String,
                required: true,
                default: "0"
            },
            lost:{
                type: String,
                required: true,
                default: "0"
            },
            profit:{
                type: String,
                required: true,
                default: "0"
            },
        },

    ],
    notes:[
        {
            title: {
                type: String,
                required: true,
                default: ""
            },
            desc: {
                type: String,
                required: true,
                default: ""
            }
        }
    ],
    files: [
        {
            name: {
                type: String,
                required: true,
                default: ""
            },
            url: {
                type: String,
                required: true,
                default: ""
            },
            public_id: {
                type: String,
                required: true,
                default: ""
            }
        }
    ]
    

}, {timestamps: true})

export default mongoose.model("OrderDetail", OrderDetailsSchema)