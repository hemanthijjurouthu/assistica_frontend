import React, { useContext, useRef } from "react";
import Card from "../components/card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const navigate = useNavigate();
  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col px-4">
      {/* Heading */}
      <h1 className="text-white mb-10 text-2xl sm:text-3xl font-semibold text-center">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>

      {/* Image options */}
      <div className="w-full max-w-[1000px] flex justify-center items-center flex-wrap gap-6">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload custom image */}
        <div
          className={`w-[100px] h-[160px] sm:w-[140px] sm:h-[220px] lg:w-[150px] lg:h-[240px] bg-[#0303260b] border-2 border-[#0000ff29] rounded-xl overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300 ${
            selectedImage === "input"
              ? "border-4 border-white shadow-2xl shadow-blue-950"
              : "hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-white"
          }`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-white w-[30px] h-[30px]" />
          )}
          {frontendImage && (
            <img
              src={frontendImage}
              className="w-full h-full object-cover"
              alt="uploaded"
            />
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next button */}
      {selectedImage && (
        <button
          className="min-w-[160px] h-[55px] mt-10 bg-white text-black font-semibold rounded-full text-[16px] hover:bg-blue-500 hover:text-white transition-all duration-300"
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;