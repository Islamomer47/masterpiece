import React from "react";

const ProfileInfo = () => {
  return (
    <div className="text-center mb-8 bg-white rounded-lg shadow-sm p-6 relative">
      <div className="relative inline-block">
        <img
          src="./src/assets/images/ahmad.png"
          alt="Ahmad H."
          className="w-32 h-32 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
        />
      </div>
      <h1 className="text-2xl font-bold mb-1">Ahmad H.</h1>
      <p className="text-sm text-gray-600 mb-2">Amman, Jordan</p>
      <div className="flex justify-center gap-4 text-sm text-gray-600 mb-3">
        <span title="Photos">📷 215</span>
        <span title="Reviews">✏️ 89</span>
        <span title="Friends">👥 132</span>
      </div>
      <button className="px-6 py-2 bg-[#060640] text-white text-sm font-semibold rounded-full hover:opacity-90 transition duration-300">
        Add friend
      </button>
    </div>
  );
};

export default ProfileInfo;
