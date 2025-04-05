import { useState } from "react";
import axios from "axios";

const QRCodePage = () => {
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQR = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const vendorId = userInfo?._id;

    if (!vendorId) {
      setError("Vendor not logged in.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(`http://localhost:5000/api/vendors/qr/${vendorId}`);
      setQRCodeUrl(data.qrCodeUrl); // assuming backend sends { qrCodeUrl: "https://..." }
    } catch (err) {
      setError("Failed to generate QR code. Please try again.");
      console.error("QR Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Generate QR Code</h2>
      <p className="mb-4 text-gray-600">Click the button below to generate your menu QR code.</p>

      <button
        onClick={handleGenerateQR}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate QR"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {qrCodeUrl && (
        <div className="mt-6 text-center">
          <p className="font-semibold mb-2 text-gray-700">Your Menu QR Code:</p>
          <img src={qrCodeUrl} alt="Menu QR Code" className="mx-auto w-40 h-40" />
        </div>
      )}
    </div>
  );
};

export default QRCodePage;
