import express from "express"
import { addPart, addToHistory, deletePart, getAllParts, getOnePart } from "../controllers/partDetails.js"
const router = express.Router()

router.post("/addPart", addPart)

router.get("/getAllParts", getAllParts)
router.get("/getOnePart/:partId",getOnePart)
router.post("/addToHistory/:partName", addToHistory)
router.put("/deleteOnePart/:partId", deletePart)



export default router