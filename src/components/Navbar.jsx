import React from "react";
import { Book, History, Bookmark, Moon } from "lucide-react";

function Navbar() {
  return (
    <div className="navbar px-[200px] flex items-center justify-between h-[100px] border-b border-[#374151]">
      
      {/* Logo */}
      <div className="logo flex items-center gap-2">
        <Book size={40} className="text-emerald-500" />
        <h3 className="text-3xl font-semibold">Dictionary</h3>
      </div>

      {/* Icons */}
      <div className="icon flex items-center gap-6">
        <History
          size={30}
          className="cursor-pointer text-emerald-500 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:text-white"
        />

        <Bookmark
          size={30}
          className="cursor-pointer text-emerald-500 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:text-white"
        />

        <Moon
          size={30}
          className="cursor-pointer text-emerald-500 transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:text-yellow-400"
        />
      </div>
    </div>
  );
}

export default Navbar;
