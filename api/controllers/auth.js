import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    if (Users.findOne({ username: req.body.username })) {
      console.log(error);
      res.status(500).json("Username has been used, please use another one");
    } else if (Users.findOne({ email: req.body.email.length > 48 })) {
      res.status(500).json("Please use a valid email");
      console.log(error);
    }
    console.log(error);
    res
      .status(500)
      .json("Something went wrong with registration, please try later...");
  }
};

//login
export const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      username: req.body.username,
    });
    if (!user)
      return res
        .status(404)
        .json("Wrong username or password, please try again");
    const decryptPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!decryptPassword)
      return res
        .status(404)
        .json("Wrong username or password, please try again");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.KEY
    );
    //user la 1 object, user._doc de choc vao property _doc
    const { password, isAdmin, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ others });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json("Something went wrong with logging in, please try later...");
  }
};
