import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const { serverUrl, setUserData } = useContext(userDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, password, email },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/customize");
    } catch (error) {
      console.log(error);
      setUserData(null);
      setError(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center px-4"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/ai-technology-artificial-intelligence-man-600nw-2263545623.jpg')",
      }}
    >
      <form
        className="w-full max-w-[500px] bg-[#00000035] backdrop-blur-md shadow-lg shadow-blue-950 flex flex-col items-center gap-6 p-6 sm:p-8 rounded-2xl"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-2xl sm:text-3xl font-semibold text-center">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full h-[55px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[16px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full h-[55px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[16px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="w-full h-[55px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full h-full border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 pr-12 rounded-full text-[16px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <IoMdEyeOff className="w-[25px] h-[25px] text-white" />
            ) : (
              <IoMdEye className="w-[25px] h-[25px] text-white" />
            )}
          </span>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-[15px] sm:text-[17px]">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          className="w-full h-[55px] bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-semibold rounded-full text-[18px] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign up"}
        </button>

        <p
          className="text-white text-[16px] sm:text-[18px] cursor-pointer text-center"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
