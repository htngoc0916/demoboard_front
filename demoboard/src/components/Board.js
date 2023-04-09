import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch, FaRegPlusSquare } from "react-icons/fa";
import BoardModal from "./BoardModal";

const Board = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [boardId, setBoardId] = useState("0");

  const handleSearch = async () => {
    try {
      const respone = await axios.get(
        `http://localhost:8080/api/boards/${query}`
      );
      console.log(respone.data);
      setData(respone.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalShow = (id) => {
    setBoardId(id);
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleViewClick = (id) => {
    setBoardId(id);
    setModal(true);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="relative">
      <div className="container mx-auto py-5">
        <div className="list-button flex justify-between items-center">
          <div className="flex gap-2 justify-between items-center">
            <label htmlFor="">Search</label>
            <input
              type="text"
              className="w-[300px] border border-gray-300 h-9 outline-none pl-1 bg-gray-100"
              placeholder="typing your keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="py-2 px-6 border-none bg-[#1d4ed8] text-center rounded-lg cursor-pointer hover:opacity-70 transition-all"
              onClick={handleSearch}
            >
              <FaSearch className="text-xl text-white"></FaSearch>
            </button>
          </div>
          <div className="flex gap-3">
            <div
              className="py-2 px-6 border-none bg-green-500 text-center rounded-lg cursor-pointer hover:opacity-70 transition-all"
              onClick={() => handleModalShow(0)}
            >
              <FaRegPlusSquare className="text-xl text-white"></FaRegPlusSquare>
            </div>
          </div>
        </div>

        <div className="grid-board mt-5 relative overflow-x-auto">
          <table className="table-auto w-full text-sm text-left text-gray-500 bg-white">
            <thead className="text-xs text-gray-700 bg-gray-100 text-center">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  No
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Created Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="text-center p-4">data not found.</div>
                  </td>
                </tr>
              )}

              {data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b text-center text-sm cursor-pointer"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td
                        className="px-6 py-4 text-blue-500"
                        onClick={() => handleViewClick(item.id)}
                      >
                        {item.title}
                      </td>
                      <td className="px-6 py-4">{item.author}</td>
                      <td className="px-6 py-4">{item.createdTime}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <BoardModal onClose={handleModalClose} id={boardId}></BoardModal>
      )}
    </div>
  );
};

export default Board;
