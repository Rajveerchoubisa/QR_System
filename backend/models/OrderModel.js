import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  vendorId: mongoose.Schema.Types.ObjectId,
  items: [{ name: String, price: Number }],
  total: Number,
  pointsEarned: Number,
});

export default mongoose.model("Order", orderSchema);
