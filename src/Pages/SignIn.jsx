import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { serverUrl, setUserData } = useContext(userDataContext);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { password, email },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/customize");
    } catch (error) {
      console.log(error);
      setUserData(null);
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
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
        className="w-full sm:w-[90%] md:w-[500px] bg-[#00000055] backdrop-blur-lg shadow-lg shadow-blue-950 
        flex flex-col items-center gap-6 p-6 sm:p-8 rounded-2xl"
        onSubmit={handleSignIn}
      >
        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl font-semibold text-center leading-snug">
          Sign in to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full h-[50px] sm:h-[55px] outline-none border-2 border-white bg-transparent text-white 
          placeholder-gray-300 px-5 rounded-full text-base sm:text-lg none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="w-full h-[50px] sm:h-[55px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full h-full outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 
            px-5 pr-12 rounded-full text-base sm:text-lg none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <IoMdEyeOff className="w-6 h-6 text-white" />
            ) : (
              <IoMdEye className="w-6 h-6 text-white" />
            )}
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm sm:text-base text-center">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full h-[50px] sm:h-[55px] bg-blue-500 hover:bg-blue-600 transition-all duration-300 
          text-white font-semibold rounded-full text-lg sm:text-xl disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign in"}
        </button>

        {/* Link */}
        <p className="text-white text-base sm:text-lg text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
