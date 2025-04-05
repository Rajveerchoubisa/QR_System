import mongoose from "mongoose";

const vendorSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  menu: [{ name: String, price: Number }],
});


export default mongoose.model("Vendor", vendorSchema);
