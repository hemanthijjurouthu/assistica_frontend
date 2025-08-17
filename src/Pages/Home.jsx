import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

import Navbar from "../components/Navbar";
import HistoryPanel from "../components/HistoryPanel";
import VoiceButton from "../components/VoiceButton";
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

  // Logout
  const handleLogout = async () => {
    try {
      await fetch(`${serverUrl}/api/auth/logout`, { credentials: "include" });
      setUserData(null);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  // Command handler for redirects/search
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
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        break;
      default:
        console.log("Unknown command:", type);
    }
  };

  // Speak AI response
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

  // Start speech recognition
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
    window.addEventListener("beforeunload", () => recognition.stop());
  };

  // Stop speech recognition
  const stopAssistant = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center relative">
      
      {/* Navbar */}
      <Navbar
        onToggleHistory={() => setHistoryOpen(!historyOpen)}
        onLogout={handleLogout}
        onCustomize={() => navigate("/customize")}
        isHistoryOpen={historyOpen}
        isMobileMenuOpen={menuOpen}
        setIsMobileMenuOpen={setMenuOpen}
      />

      {/* History Panel */}
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        historyItems={userData?.history || []}
      />

      {/* Voice Button */}
      <VoiceButton
        isListening={listening}
        onToggleListening={() => (listening ? stopAssistant() : startAssistant())}
      />

      {/* Assistant Avatar */}
      <Avatar src={userData?.assistantImage} alt={userData?.assistantName} listening={listening}/>

      {/* Assistant Name */}
      <h1 className="text-white text-lg sm:text-xl font-semibold text-center mt-4">
        Hi I'm <span className="text-blue-400">{userData?.assistantName}</span>
      </h1>

      {/* Conversation Images */}
      {userText && <img src={userImg} className="w-[150px] sm:w-[200px]" alt="user speaking" />}
      {aiText && <img src={aiImg} className="w-[150px] sm:w-[200px]" alt="ai speaking" />}

      {/* Conversation Text */}
      {(userText || aiText) && (
        <h1 className="text-white text-base sm:text-xl lg:text-2xl font-semibold text-center mt-4 px-4 py-2 bg-gray-800/50 rounded-xl shadow-md max-w-[90%] sm:max-w-[80%] mx-auto break-words">
          {userText || aiText}
        </h1>
      )}
    </div>
  );
};

export default Home;
