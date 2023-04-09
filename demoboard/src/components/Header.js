import React from "react";

const Header = () => {
  return (
    <div className="p-5 bg-slate-300">
      <div className="flex justify-between items-center">
        <div className="text-xl font-normal">Board v.01 04.2023</div>
        <div className="card flex justify-between items-center gap-1 cursor-pointer">
          <div className="border rounded-full w-7 h-7 bg-white">
            <a href="/">
              <img src="/img/logo.svg" alt="" />
            </a>
          </div>
          <div>htngoc</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
