import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomNumbers: [{ number: Number, unavaiableDates: {type: [Date]} }],
});

export default mongoose.model("Rooms", RoomSchema);
