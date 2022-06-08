import Hotels from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json("Something wrong with hotel route");
  }
};
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
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted the data..");
  } catch (error) {
    res.status(500).json("Something wrong with deleting data");
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json("Cannot find any datas of the hotel");
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(","); // tach query sang mang, split = ,
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res
      .status(500)
      .json("Something wrong fetching the cities, please try again");
    console.log(error);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotels.countDocuments({ type: "Hotels" });
    const apartmentCount = await Hotels.countDocuments({ type: "Apartments" });
    const resortCount = await Hotels.countDocuments({ type: "Resorts" });
    const villaCount = await Hotels.countDocuments({ type: "Villas" });
    const cabinCount = await Hotels.countDocuments({ type: "Cabins" });
    res.status(200).json([
      { type: "Hotels", count: hotelCount },
      { type: "Apartments", count: apartmentCount },
      { type: "Resorts", count: resortCount },
      { type: "Villas", count: villaCount },
      { type: "Cabins", count: cabinCount },
    ]);
  } catch (error) {
    res
      .status(401)
      .json(
        "something went wrong with counting by type, please contact admins"
      );
  }
};

export const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotels.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max  || 999},
    }).limit(req.query.limit);
    //xu ly query cheapest price + maximum price
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json("Cannot find any datas");
  }
};
