import React from "react";

const ConfirmAlert = () => {
  return (
    <div className="w-[350px] border bg-white p-4 rounded-lg mx-auto shadow">
      <div className="text-center pt-4 pb-8">Do you want to save?</div>
      <div className="flex gap-3 justify-center">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Yes
        </button>
        <button
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmAlert;
