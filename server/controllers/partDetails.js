import PartDetails from "../models/PartDetails.js";

export const addPart = async (req, res) => {
  console.log(req.body);
  try {
    const newPart = new PartDetails(req.body);
    await newPart.save();
    res.status(200).json(newPart);
  } catch (err) {
    console.log(err);
    res.status(409).json(err)
  }
};

export const getAllParts = async (req, res) => {
  try {
    const parts = await PartDetails.find();
    res.status(200).json(parts);
  } catch (err) {
    console.log(err);
  }
};

export const getOnePart = async(req, res) => {
  try{
      const order = await PartDetails.findById(req.params.partId);
      res.status(200).json(order)

      // console.log(order);
  }catch(err){
      console.log(err);
  }
}

// export const addPartHistory = async(req, res) => {
//     console.log(req.body.name);
//     try{
//         const part = await PartDetails.findOne({productName: req.body.name})
//         res.status(200).json(part)
//     }catch(err){
//         console.log(err);
//     }
// }

// export const addToHistory = async (req, res) => {
//   console.log(req.params.partName);
//   const part = req.body.part;
//   const locationNumber = req.body.locationNumber;
//   const orderId = req.body.orderId;
//   try {
//     await PartDetails.findOneAndUpdate(
//       { productName: req.params.partName },
//       {
//         $push: {
//           priceHistory: {
//             locationNumber: locationNumber,
//             orderId: orderId,
//             quantity: part.quantity,
//             price: part.price,
//             costPrice: part.cprice,
//             total: part.total,
//             won: part.won,
//             lost: part.lost,
//             open: part.open,
//           },
//         },
//       }
//     );
//     res.send({ success: "true" });
//     // console.log(req.body.part);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addToHistory = async (req, res) => {
  console.log(req.params.partName);
  const part = req.body.part;
  const locationNumber = req.body.locationNumber;
  const orderId = req.body.orderId;
  try {
    const partDetails = await PartDetails.findOne({ productName: req.params.partName });
    const historyIndex = partDetails.priceHistory.findIndex(history => history.locationNumber === locationNumber);
    if (historyIndex !== -1) {
      partDetails.priceHistory[historyIndex] = {
        locationNumber: locationNumber,
        orderId: orderId,
        quantity: part.quantity,
        price: part.price,
        costPrice: part.cprice,
        total: part.total,
        won: part.won,
        lost: part.lost,
        open: part.open,
      };
      await partDetails.save();
    } else {
      await PartDetails.findOneAndUpdate(
        { productName: req.params.partName },
        {
          $push: {
            priceHistory: {
              locationNumber: locationNumber,
              orderId: orderId,
              quantity: part.quantity,
              price: part.price,
              costPrice: part.cprice,
              total: part.total,
              won: part.won,
              lost: part.lost,
              open: part.open,
            },
          },
        }
      );
    }
    res.send({ success: "true" });
    // console.log(req.body.part);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};