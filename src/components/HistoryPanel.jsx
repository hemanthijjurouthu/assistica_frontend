import React from "react";
import { RxCross2 } from "react-icons/rx";

const HistoryPanel = ({ isOpen, onClose, historyItems }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 sm:w-96 
                    bg-gradient-to-b from-black/90 to-[#030353]/90 
                    backdrop-blur-md shadow-xl p-6 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">History</h2>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <RxCross2 size={24} />
        </button>
      </div>

      {/* History Items */}
      {historyItems.length > 0 ? (
        <div className="flex flex-col gap-3">
          {historyItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 text-gray-100 px-4 py-2 rounded shadow-sm break-words hover:bg-white/20 transition"
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 text-sm">No history yet</p>
      )}
    </div>
  );
};

export default HistoryPanel;
