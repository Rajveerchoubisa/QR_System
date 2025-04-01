import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from '../components/Login';


const Home = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin,setShowLogin] = useState(false);


  return (
    <div className="h-screen flex flex-col bg-[#172134] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-[#183a55]">
        <h1 className="text-2xl font-bold text-white">QR Menu System</h1>
        <div>
          <button onClick={() => setShowLogin(true)} className="mr-4 px-4 py-2 text-white hover:scale-105  hover:text-blue-500">
            Login
          </button>
          <button
            className="px-4 py-2 hover:scale-105 text-white  hover:text-blue-500"
            onClick={() => setShowSignup(true)} // Show Signup Form
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="flex flex-col flex-grow items-center justify-center">
        <h2 className="text-3xl font-semibold text-[#F4E1C1]">
          Welcome to QR Menu System
        </h2>
        <p className="p-5 m-5 text-xl">Create your menu QR code</p>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <Signup />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              onClick={() => setShowSignup(false)} // Close button
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* login modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <Login />
          <button
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            onClick={() => setShowLogin(false)} // Close button
          >
            Close
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;

