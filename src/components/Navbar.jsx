import React from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  onToggleHistory,
  onLogout,
  onCustomize,
  isHistoryOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full sticky top-0 z-50 shadow-md bg-gradient-to-r from-purple-800 via-[#030353] to-black">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 max-w-full mx-auto">

        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent cursor-pointer" onClick={()=>navigate("/")}>
            Assistica
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-4 items-center">
            <button
              onClick={onToggleHistory}
              className={`px-3 py-2 rounded-md font-medium flex items-center space-x-2 ${
                isHistoryOpen
                  ? "bg-purple-100 text-purple-700"
                  : "text-white hover:text-purple-400 hover:bg-white/10"
              }`}
            >
              <FaHistory size={18} /> <span>History</span>
            </button>
            <button
              onClick={onCustomize}
              className="px-3 py-2 rounded-md font-medium text-white hover:text-purple-400 hover:bg-white/10 flex items-center space-x-2"
            >
              <IoIosSettings size={18} /> <span>Customize</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2 rounded-md font-medium text-white hover:text-red-400 hover:bg-white/10 flex items-center space-x-2"
            >
              <AiOutlineLogout size={18} /> <span>Logout</span>
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-purple-400 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <RxCross2 size={24} /> : <RiMenu2Fill size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
  <div className="lg:hidden fixed top-16 right-4 w-40 bg-gradient-to-t from-black to-[#030353] rounded-lg shadow-lg flex flex-col py-2 z-50">
    <button
      onClick={() => {
        onToggleHistory();
        setIsMobileMenuOpen(false);
      }}
      className="px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200 rounded"
    >
      History
    </button>
    <button
      onClick={() => {
        onCustomize();
        setIsMobileMenuOpen(false);
      }}
      className="px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200 rounded"
    >
      Customize
    </button>
    <button
      onClick={() => {
        onLogout();
        setIsMobileMenuOpen(false);
      }}
      className="px-4 py-2 text-left text-red-400 hover:bg-white/10 transition-colors duration-200 rounded"
    >
      Logout
    </button>
  </div>
)}
    </nav>
  );
};

export default Navbar;
