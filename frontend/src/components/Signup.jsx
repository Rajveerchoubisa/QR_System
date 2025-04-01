import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => setShow(!show);

  const SubmitHandler = async () => {
    setLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/vendors/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Registration Successful!");
      localStorage.setItem("userInfo", JSON.stringify(data)); // Save user data

      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error registering. Try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Enter your Name"
          className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-blue-500"
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button
        onClick={SubmitHandler}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Signup;
