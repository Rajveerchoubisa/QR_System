import { Link } from "react-router-dom";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">Vendor Dashboard</h1>
        <div className="flex gap-4">
          <Link to="/vendor/menu">
            <button className=" hover:text-blue-400 text-black px-4 py-2 rounded-md">
              Manage Menu
            </button>
          </Link>
          <Link to="/vendor/qrcode">
            <button className="b hover:text-blue-400 text-black px-4 py-2 rounded-md">
              Create QR
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Welcome to your Vendor Dashboard
        </h2>
        <p className="text-gray-600">
          Use the navigation bar to manage your menu or create a QR code for your menu.
        </p>
      </main>
    </div>
  );
};

export default VendorDashboard;
