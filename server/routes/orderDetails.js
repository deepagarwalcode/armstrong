import express from "express"
import { addOrder, getAllOrders, getOneOrder, updateOneOrder } from "../controllers/orderDetails.js"
const router = express.Router()

router.post("/addOrder", addOrder)

router.get("/getAllOrders", getAllOrders)

router.get("/getOneOrder/:orderId", getOneOrder)

router.put("/updateOneOrder/:orderId", updateOneOrder)

export default router