import express from "express"
import { addPart, addToHistory, getAllParts, getOnePart } from "../controllers/partDetails.js"
const router = express.Router()

router.post("/addPart", addPart)

router.get("/getAllParts", getAllParts)
router.get("/getOnePart/:partId",getOnePart)
router.post("/addToHistory/:partName", addToHistory)



export default router