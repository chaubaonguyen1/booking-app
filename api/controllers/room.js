import Rooms from "../models/Rooms.js";
import Hotels from "../models/Hotels.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }, //method update cua mongo
      });
    } catch (error) {
      res.status(401).json("Something wrong with creating data, please try again")
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
      //findByIdAndUpdate co 2 tham so, req.params.id la lay tu URL o dong 21,
      // sau do la 1 object voi method set de thay doi
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json("Something wrong with editing data");
  }
}
export const deleteRoom = async (req, res, next) => {
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted the data..");
  } catch (error) {
    res.status(500).json("Something wrong with deleting data");
  }
}
export const getRoom = async (req, res, next) => {
  try {
    const rooms = await Rooms.findById(req.params.id);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Cannot find any datas of the room");
  }
}
export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Cannot find any datas");
  }
}