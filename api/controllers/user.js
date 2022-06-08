import Users from "../models/Users.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
      //findByIdAndUpdate co 2 tham so, req.params.id la lay tu URL o dong 21,
      // sau do la 1 object voi method set de thay doi
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("Something wrong with editing data");
  }
}
export const deleteUser = async (req, res, next) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted the data..");
  } catch (error) {
    res.status(500).json("Something wrong with deleting data");
  }
}
export const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Cannot find any datas of the User");
  }
}
export const getAllUser = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Cannot find any datas");
  }
}