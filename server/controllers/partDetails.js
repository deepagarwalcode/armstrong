import PartDetails from "../models/PartDetails.js";

export const addPart = async(req, res) => {
    console.log(req.body);
    try{
        const newPart = new PartDetails(req.body);
        await newPart.save(); 
        res.status(200).json(newPart)
    }catch(err){
        console.log(err);
    }
}

export const getAllParts = async(req, res) => {
    try{
        const parts = await PartDetails.find();
        res.status(200).json(parts)
    }catch(err){
        console.log(err);
    }
}