import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

import Navbar from "../components/Navbar";
import HistoryPanel from "../components/HistoryPanel";
import Avatar from "../components/Avatar";

import userImg from "../assets/user.gif";
import aiImg from "../assets/ai.gif";

const Home = () => {
  const { userData, setUserData, serverUrl, getGeminiResponse } =
    useContext(userDataContext);

  const [listening, setListening] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");

  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${serverUrl}/api/auth/logout`, { credentials: "include" });
      setUserData(null);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommand = (data) => {
    const { type, userInput } = data;
    const query = encodeURIComponent(userInput);
    switch (type) {
      case "google-search":
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        break;
      case "calculator-open":
        window.open(`https://www.google.com/search?q=calculator`, "_blank");
        break;
      case "instagram-open":
        window.open(`https://www.instagram.com/`, "_blank");
        break;
      case "facebook-open":
        window.open(`https://www.facebook.com`, "_blank");
        break;
      case "weather-show":
        window.open(`https://www.google.com/search?q=weather`, "_blank");
        break;
      case "youtube-search":
      case "youtube-play":
        window.open(
          `https://www.youtube.com/results?search_query=${query}`,
          "_blank"
        );
        break;
      default:
        console.log("Unknown command:", type);
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((v) => v.lang === "en-US") || voices[0];
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      setAiText("");
      setUserText("");
    };
  };

  const startAssistant = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      setUserText(transcript);
      setAiText("");

      if (
        userData.assistantName &&
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        const data = await getGeminiResponse(transcript);
        setAiText(data.response);
        setUserText("");
        speak(data.response);
        handleCommand(data);
      }
    };

    recognition.onend = () => {
      if (listening) recognition.start();
    };

    recognition.start();
    setListening(true);

    const userName = userData?.name || "there";
    const assistantName = userData?.assistantName || "your assistant";
    speak(`Hi ${userName}, I'm ${assistantName}. How can I help you today?`);

    window.addEventListener("beforeunload", () => recognition.stop());
  };

  const stopAssistant = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center relative">
      <Navbar
        onToggleHistory={() => setHistoryOpen(!historyOpen)}
        onLogout={handleLogout}
        onCustomize={() => navigate("/customize")}
        isHistoryOpen={historyOpen}
        isMobileMenuOpen={menuOpen}
        setIsMobileMenuOpen={setMenuOpen}
      />

      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        historyItems={userData?.history || []}
      />

      <Avatar
        src={userData?.assistantImage}
        alt={userData?.assistantName}
        listening={listening}
      />
      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center">
  {!listening ? (
    <div
      onClick={startAssistant}
      className="cursor-pointer bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 
                 hover:from-indigo-500 hover:via-blue-600 hover:to-indigo-700 
                 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg 
                 text-center transition-all duration-300 transform hover:scale-110"
    >
            🎤 Start {userData?.assistantName || "Assistant"}
    </div>
  ) : (
    <div
      onClick={stopAssistant}
      className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 
                 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-800 
                 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl 
                 text-center transition-all duration-300 transform hover:scale-110 animate-pulse"
    >
      🎧 {userData?.assistantName || "Assistant"} is listening... (Click to stop)
    </div>
  )}
</div>
      <h1 className="text-white text-lg sm:text-xl font-semibold text-center mt-4">
        Hi I'm{" "}
        <span className="text-blue-400">{userData?.assistantName}</span>
      </h1>

      {userText && (
        <img
          src={userImg}
          className="w-[150px] sm:w-[200px]"
          alt="user speaking"
        />
      )}
      {aiText && (
        <img
          src={aiImg}
          className="w-[150px] sm:w-[200px]"
          alt="ai speaking"
        />
      )}

      {(userText || aiText) && (
        <h1 className="text-white text-base sm:text-xl lg:text-2xl font-semibold text-center mt-4 px-4 py-2 bg-gray-800/50 rounded-xl shadow-md max-w-[90%] sm:max-w-[80%] mx-auto break-words">
          {userText || aiText}
        </h1>
      )}
    </div>
  );
};

export default Home;
