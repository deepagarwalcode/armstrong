import OrderDetails from "../models/OrderDetails.js";

export const addOrder = async(req, res) => {
    console.log(req.body);
    try{
        const newOrder = new OrderDetails(req.body);
        await newOrder.save(); 
        res.status(200).json(newOrder)
    }catch(err){
        console.log(err);
    }
}

export const getAllOrders = async(req, res) => {
    try{
        const orders = await OrderDetails.find();
        res.status(200).json(orders)
    }catch(err){
        console.log(err);
    }
}

export const getOneOrder = async(req, res) => {
    try{
        const order = await OrderDetails.findById(req.params.orderId);
        res.status(200).json(order)

        // console.log(order);
    }catch(err){
        console.log(err);
    }
}

export const updateOneOrder = async(req, res) => {
    console.log(req.body);
    const updates = req.body;
    try{
        const updatedOrder = await OrderDetails.findByIdAndUpdate(req.params.orderId, updates);
        res.status(200).json(updatedOrder)

        // console.log(order);
    }catch(err){
        console.log(err);
    }
}