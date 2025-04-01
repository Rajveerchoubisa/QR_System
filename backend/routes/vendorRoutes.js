import express from "express";
import { registerVendor, loginVendor, addMenuItem, generateQRCode } from "../controllers/vendorController.js";

const router = express.Router();

router.post("/register", registerVendor);
router.post("/login", loginVendor);
router.post("/menu", addMenuItem);
router.get("/qr/:id", generateQRCode);

export default router;
