import express from "express"
import { addPart, getAllParts } from "../controllers/partDetails.js"
const router = express.Router()

router.post("/addPart", addPart)

router.get("/getAllParts", getAllParts)



export default router