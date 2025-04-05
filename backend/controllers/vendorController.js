import Vendor from "../models/VendorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";

  console.log("🚀 Login route hit!");



  export const registerVendor = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }
  
    const vendorExists = await Vendor.findOne({ email });
  
    if (vendorExists) {
      return res.status(400).json({ message: "Vendor already exists." });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    console.log("🔐 Registering vendor:");
    console.log("Plain password:", password);
    console.log("Hashed password:", hashedPassword);
  
    const vendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
    });
  
    res.status(201).json({ message: "Vendor registered successfully!" });
  };


  export const loginVendor = async (req, res) => {
    const { email, password } = req.body;
  
    console.log("✅ /api/vendors/login hit");
    console.log("📥 Request Body:", req.body);
  
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }
  
    try {
      const vendor = await Vendor.findOne({ email });
  
      if (!vendor) {
        return res.status(400).json({ message: "Vendor not found." });
      }
  
      console.log("🧑‍💼 Vendor found:", vendor);
      console.log("🔑 Entered Password:", password);
      console.log("🧂 Stored Hashed Password:", vendor.password);
  
      const isMatch = await bcrypt.compare(password, vendor.password);
      console.log("✅ Password Match Result:", isMatch);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials." });
      }
  
      const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.json({
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

export const addMenuItem = async (req, res) => {
  const { vendorId, name, price } = req.body;
  try {
    const vendor = await Vendor.findById(vendorId);
    vendor.menu.push({ name, price });
    await vendor.save();
    res.json(vendor.menu);
  } catch (error) {
    res.status(400).json({ message: "Error adding menu item" });
  }
};

export const generateQRCode = async (req, res) => {
  const qrCodeData = `https://localhost:5000/menu/${req.params.id}`;
  const qrCode = await QRCode.toDataURL(qrCodeData);
  res.json({ qrCode });
};
