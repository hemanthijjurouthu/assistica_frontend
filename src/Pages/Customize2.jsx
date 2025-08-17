import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
  const { userData, setUserData, backendImage, selectedImage, serverUrl } =
    useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      setLoading(true);
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );

      console.log(result);
      setUserData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col px-4 relative">
      {/* Back button */}
      <IoArrowBackOutline
        className="absolute top-6 left-6 text-white w-[30px] h-[30px] cursor-pointer hover:text-blue-400 transition-all duration-300"
        onClick={() => navigate("/customize")}
      />

      {/* Heading */}
      <h1 className="text-white mb-10 text-2xl sm:text-3xl font-semibold text-center">
        Enter your <span className="text-blue-400">Assistant name</span>
      </h1>

      {/* Input */}
      <input
        type="text"
        placeholder="e.g: Shifra"
        className="w-full max-w-[600px] h-[55px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[16px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
      />

      {/* Button only if assistantName exists */}
      {assistantName && (
        <button
          className="w-[270px] h-[55px] mt-8 bg-white text-black font-semibold rounded-full text-[16px] hover:bg-blue-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={() => {
            handleUpdateAssistant();
            navigate("/");
          }}
        >
          {loading ? "Loading..." : "Finally Create your assistant"}
        </button>
      )}
    </div>
  );
};

export default Customize2;
