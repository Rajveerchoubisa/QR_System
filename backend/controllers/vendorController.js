import Vendor from "../models/VendorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";


export const registerVendor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    // Hash the password properly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new vendor
    const vendor = await Vendor.create({ 
      name, 
      email, 
      password: hashedPassword // Store hashed password
    });

    // Generate JWT Token
    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      token,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginVendor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields." });
  }

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found." });
    }


    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      console.log("Password comparison failed!");
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

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
