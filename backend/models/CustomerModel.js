import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 100 },
});

export default mongoose.model("Customer", customerSchema);
