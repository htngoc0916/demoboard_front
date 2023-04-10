import React, { useEffect, useState, useRef } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ConfirmAlert from "./ConfirmAlert";

const BoardModal = ({ onClose, id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const formRef = useRef(null);

  const handleModalClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    try {
      const respone = await axios.delete(
        `http://localhost:8080/api/boards/${id}`
      );
      console.log(respone.data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    if (title !== "") {
      try {
        const respone = await axios.put(
          `http://localhost:8080/api/boards/${id}`,
          {
            id: id,
            title: title,
            content: content,
            author: "htngoc",
            createdTime: new Date(),
            createdUserID: "htngoc",
          }
        );
        console.log(respone.data);
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const respone = await axios.get(
        `http://localhost:8080/api/boards?id=${id}`
      );
      console.log(respone.data);
      setTitle(respone.data?.data.title);
      setContent(respone.data?.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setContent(content);
  };

  useEffect(() => {
    if (id !== 0) {
      handleSearch();
    }
  }, []);

  return (
    <div>
      {/* Main modal */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-14 overflow-x-hidden overflow-y-auto">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 opacity-60"></div>
        <div className="relative w-full h-full max-w-3xl mx-auto z-50 flex items-center justify-end">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Board modal
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-hide="staticModal"
                onClick={handleModalClose}
              >
                <GrClose></GrClose>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <div className="text-base leading-relaxed text-gray-500">
                <form className="space-y-6" action="#" ref={formRef}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="typing title..."
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </div>
                  <div className="">
                    <label
                      htmlFor="content"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Content
                    </label>
                    <div>
                      <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={handleEditorChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleEdit}
              >
                Save
              </button>

              {id !== 0 && (
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
