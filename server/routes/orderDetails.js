import express from "express";
import {
  addFile,
  addOrder,
  deleteFile,
  deleteNote,
  deleteOrder,
  getAllOrders,
  getMonthlyRevenue,
  getMonthlyRevenueTest,
  getMonthlyStats,
  getNotes,
  getOneOrder,
  pushNote,
  updateOneOrder,
} from "../controllers/orderDetails.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/addOrder", addOrder);

router.get("/getAllOrders", getAllOrders);

router.get("/getOneOrder/:orderId", getOneOrder);

router.put("/updateOneOrder/:orderId", updateOneOrder);

router.get("/getMonthlyRevenue", getMonthlyRevenueTest);

router.get("/getMonthlyStats", getMonthlyStats);

router.get("/getNotes/:orderId", getNotes);

router.post("/pushNote/:orderId", pushNote);

router.put("/deleteNote/:orderId", deleteNote);

router.put("/deleteFile/:orderId", deleteFile);

router.post("/addFile/:orderId", upload.single("file"), addFile);

router.put("/deleteOneOrder/:orderId", deleteOrder);


export default router;
