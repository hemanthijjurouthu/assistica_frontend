import React from "react";

const Avatar = ({ src, alt, listening }) => {
  return (
    <div
      className={`
        w-[260px] h-[360px] sm:w-[300px] sm:h-[400px]
        flex justify-center items-center overflow-hidden rounded-2xl shadow-lg flex-col gap-4
        transition transform mt-2
        ${listening 
          ? "scale-105 shadow-2xl shadow-blue-400 animate-pulse" 
          : "hover:shadow-xl hover:shadow-blue-400"}
      `}
    >
      <img
        className="h-full w-full object-cover"
        src={src}
        alt={alt || "assistant"}
      />
    </div>
  );
};

export default Avatar;
