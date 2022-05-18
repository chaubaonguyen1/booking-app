import Hotels from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json("Something wrong with hotel route");
  }
}
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
      //findByIdAndUpdate co 2 tham so, req.params.id la lay tu URL o dong 21,
      // sau do la 1 object voi method set de thay doi
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json("Something wrong with editing data");
  }
}
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted the data..");
  } catch (error) {
    res.status(500).json("Something wrong with deleting data");
  }
}
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json("Cannot find any datas of the hotel");
  }
}
export const getAllHotel = async (req, res, next) => {
  try {
    const hotels = await Hotels.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json("Cannot find any datas");
  }
}