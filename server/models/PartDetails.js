import mongoose from "mongoose";

const PartDetailsSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    productDesc: {
      type: String,
      required: true,
      default: "",
    },
    productFinish: {
      type: String,
      required: true,
      default: "",
    },
    grade: {
      type: String,
      required: true,
      default: "",
    },
    unit: {
      type: String,
      required: true,
      default: "",
    },
    unitPrices: {
      type: String,
      required: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      default: "",
    },
    priceHistory: [
      {
        locationNumber: {
          type: String,
          required: true,
          default: "",
        },
        orderId: {
          type: String,
          required: true,
          default: "",
        },
        quantity: {
          type: String,
          required: true,
          default: "",
        },
        price: {
          type: String,
          required: true,
          default: "",
        },
        costPrice: {
          type: String,
          required: true,
          default: "",
        },
        total: {
          type: String,
          required: true,
          default: "",
        },
        won: {
          type: String,
          required: true,
          default: "",
        },
        lost: {
          type: String,
          required: true,
          default: "",
        },
        open: {
          type: String,
          required: true,
          default: "",
        },
        // date:{
        //   type: String,
        //   required: true,
        //   default: "",
        // }
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("PartDetail", PartDetailsSchema);
