import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const SubmitHandler = async () => {
    setLoading(true);
    setError("");
  
    if (!email || !password) {
      setError("Please fill all the fields.");
      setLoading(false);
      return;
    }
  
    try {
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/vendors/login",
        { email, password },
        config
      );
  
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error
      );
      setError(error.response?.data?.message || "Error Occurred");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-black">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4 relative">
        <label className="block text-gray-700 font-semibold">Password</label>
        <input
          type={show ? "text" : "password"}
          value={password}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="absolute right-3 top-9 text-sm text-blue-500"
          onClick={handleClick}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={SubmitHandler}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
