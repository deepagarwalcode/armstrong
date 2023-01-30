import OrderDetails from "../models/OrderDetails.js";
import multer from "multer";
import DataUriParser from "datauri/parser.js";
import path from "path";
import cloudinary from "cloudinary";
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const addOrder = async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new OrderDetails(req.body);
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderDetails.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const order = await OrderDetails.findById(req.params.orderId);
    res.status(200).json(order);

    // console.log(order);
  } catch (err) {
    console.log(err);
  }
};

export const updateOneOrder = async (req, res) => {
  // console.log(req.body);
  const updates = req.body;
  try {
    const updatedOrder = await OrderDetails.findByIdAndUpdate(
      req.params.orderId,
      { $set: updates },
      { new: true }
    );
    // console.log(updatedOrder);
    res.status(200).json(updatedOrder);

    // console.log(order);
  } catch (err) {
    console.log(err);
  }
};

export const getMonthlyRevenue = async (req, res) => {
  try {
    const orders = await OrderDetails.find();
    const monthlyRevenue = [];
    const revenueData = {};
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString(
        "default",
        { month: "long" }
      );
      if (!revenueData[month]) {
        revenueData[month] = 0;
      }
      revenueData[month] += order.value;
    });
    for (let month in revenueData) {
      monthlyRevenue.push({ monthName: month, value: revenueData[month] });
    }
    res.status(200).json(monthlyRevenue);
  } catch (err) {
    console.log(err);
  }
};

export const getMonthlyRevenueTest = async (req, res) => {
  try {
    const orders = await OrderDetails.find();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = [];
    const revenueData = {};
    orders.forEach((order) => {
      if (order.status !== "won") return;
      const orderYear = new Date(order.createdAt).getFullYear();
      if (orderYear !== currentYear) return;
      const month = new Date(order.createdAt).toLocaleString(
        "default",
        { month: "long" }
      );
      if (!revenueData[month]) {
        revenueData[month] = 0;
      }
      revenueData[month] += order.value;
    });
    months.forEach((month) => {
      monthlyRevenue.push({ monthName: month, value: revenueData[month] || 0 });
    });
    res.status(200).json(monthlyRevenue);
  } catch (err) {
    console.log(err);
  }
};

export const getMonthlyStats = async (req, res) => {
  try {
    const orders = await OrderDetails.find();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentYear = new Date().getFullYear();
    const monthlyStats = [];
    const statsData = {};
    orders.forEach((order) => {
      const orderYear = new Date(order.createdAt).getFullYear();
      if (orderYear !== currentYear) return;
      const month = new Date(order.createdAt).toLocaleString(
        "default",
        { month: "long" }
      );
      if (!statsData[month]) {
        statsData[month] = { month: month, won: 0, lost: 0, open: 0 };
      }
      switch (order.status) {
        case "won":
          statsData[month].won += 1;
          break;
        case "lost":
          statsData[month].lost += 1;
          break;
        case "open":
          statsData[month].open += 1;
          break;
        default:
          break;
      }
    });
    months.forEach((month) => {
      monthlyStats.push(
        statsData[month] || { month: month, won: 0, lost: 0, open: 0 }
      );
    });
    res.status(200).json(monthlyStats);
  } catch (err) {
    console.log(err);
  }
};

export const getNotes = async (req, res) => {
  try {
    const order = await OrderDetails.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
  }
};

export const pushNote = async (req, res) => {
  try {
    const order = await OrderDetails.findById(req.params.orderId);
    order.notes.push({ title: req.body.title, desc: req.body.desc });
    await order.save();
    console.log(order);
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const order = await OrderDetails.findById(req.params.orderId);
    order.notes = order.notes.filter(note => note._id.toString() !== req.body.noteId);
    await order.save();
    res.status(200).json({ message: "Note successfully deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const order = await OrderDetails.findById(req.params.orderId);
    order.files = order.files.filter(file => file._id.toString() !== req.body.fileId);
    await order.save();
    res.status(200).json({ message: "File successfully deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getDataUri = (file) => {
  console.log(file);
  const parser = new DataUriParser();
  const extname = path.extname(file.originalname).toString();
  console.log(extname);
  return parser.format(extname, file.buffer);
};

export const addFile = async (req, res) => {
  try {
    const order = await OrderDetails.findById(req.params.orderId);
    const file = req.file;
    const fileUri = getDataUri(file);
    console.log(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      pages: true,
    });

    order.files.push({ name: file.originalname, url: mycloud.secure_url });
    await order.save();
    res.status(200).json(order);

    // order.notes.push({ title: req.body.title, desc: req.body.desc });
    // await order.save();
    // console.log(order);
    // res
    //   .status(200)
    //   .json({ url: mycloud.secure_url, public_id: mycloud.public_id });
  } catch (err) {
    console.log(err);
  }
};
