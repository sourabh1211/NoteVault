import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from '../components/Navbar';
import CheckBox from '../tools/checkBox';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch("https://notesapp-1-56xy.onrender.com/addNote", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: desc,
        content,
        isImportant,
        uploadedBy: localStorage.getItem("userID"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Note Added Successfully");
          navigate("/");
        } else {
          alert("Error Adding Note..!");
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="addNoteCon min-h-screen px-[50px] py-8 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <form onSubmit={submitForm} className="my-5">
          <h3 className="text-2xl mb-5">Create A New Note</h3>

          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">
              Enter A Note Title
            </label>
            <input
              type="text"
              placeholder="Note Title"
              className="w-full p-2 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white border-2 border-gray-500"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">
              Enter A Note Description
            </label>
            <textarea
              placeholder="Note Description"
              className="w-full p-2 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white border-2 border-gray-500 min-h-[100px]"
              name="description"
              id="description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              required
            ></textarea>
          </div>

          <CheckBox title="Is Important" check={isImportant} setCheck={setIsImportant} />

          <div className="my-4">
            <JoditEditor
              ref={editorRef}
              value={content}
              tabIndex={1}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <button
            className="btnNormal my-3 !min-w-[200px] bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition dark:bg-gray-700 dark:hover:bg-gray-600"
            type="submit"
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
