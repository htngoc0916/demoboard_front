import React from "react";

const Header = () => {
  return (
    <div className="p-5 bg-gray-500">
      <div className="flex justify-between items-center">
        <div className="text-xl font-normal text-white">
          Board{" "}
          <span className="inline-block text-sm text-white">v.01 04.2023</span>
        </div>
        <div className="card flex justify-between items-center gap-1 cursor-pointer">
          <div className="border rounded-full w-7 h-7 bg-white">
            <a href="/">
              <img src="/img/logo.svg" alt="" />
            </a>
          </div>
          <div className="text-white">htngoc</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
