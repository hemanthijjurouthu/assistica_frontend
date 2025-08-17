import React from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const VoiceButton = ({ isListening, onToggleListening }) => {
  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      {!isListening ? (
        <button
          onClick={onToggleListening}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
        >
          <FaMicrophone className="w-10 h-10" />
        </button>
      ) : (
        <button
          onClick={onToggleListening}
          className="relative w-20 h-20 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition"
        >
          <FaMicrophoneSlash className="w-10 h-10" />
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
        </button>
      )}
    </div>
  );
};

export default VoiceButton;
