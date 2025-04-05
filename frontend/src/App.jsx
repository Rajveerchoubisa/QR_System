import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VendorDashboard from '../src/pages/VendorDashboard.jsx'
import ManageMenu from "./pages/ManageMenu";
import QRCodePage from "./pages/QRCodePage";

function App() {
  return (
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/menu" element={<ManageMenu />} />
        <Route path="/vendor/qrcode" element={<QRCodePage />} />
      </Routes>
  
  );
}

export default App;
