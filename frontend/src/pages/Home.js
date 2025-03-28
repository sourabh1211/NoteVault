import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Note from '../components/Note'
import Fotter from '../components/Fotter'
import Oops from '../components/Oops'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);
  
  let getNotes = () => {
    fetch("https://notesapp-1-56xy.onrender.com/getNotes", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userID") })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success === false) setError(data.msg);
      else setData(data);
    });
  };
  
  function getUserDetails() {
    fetch("https://notesapp-1-56xy.onrender.com/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userID") })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success === false) navigate("/login");
      else setUserData(data);
    })
  }

  useEffect(() => {
    getNotes();
    getUserDetails();
  }, []);
  
  const handleDelete = () => {
    if (!deleteNote) return;
    fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ noteId: deleteNote._id })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setDeleteNote(null);
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />

      <div className='mt-8 flex items-center justify-between w-screen px-12'>
        <h1 className='text-4xl font-bold text-gray-700 tracking-wide transition-all duration-300'>
          Hi, <span className="text-blue-500">{userData ? userData.name : ""}</span>
        </h1>
        <div className="relative w-[380px]">
          <input 
            onKeyUp={(e) => { if (e.key === "Enter") navigate(`/search?query=${query}`); }} 
            onChange={(e) => setQuery(e.target.value)} 
            value={query} 
            type="text" 
            placeholder='Search Notes...' 
            className='w-full p-4 pl-5 pr-10 rounded-xl text-lg border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 bg-white'
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 py-8">
        {data ? (
          data.map((el, index) => (
            <div 
              key={index} 
              className="bg-white p-5 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1"
            >
              <Note index={index} note={el} setDeleteNote={setDeleteNote} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <Oops 
              title={"No Note Found"} 
              image={require("../Images/oops2.png")} 
              buttonTitle={"Add Note"} 
              buttonLink={"/addNewNote"} 
            />
          </div>
        )}
      </div>

      <Fotter />

      {deleteNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-[99999] transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[28vw] text-center animate-fadeIn">
            <h3 className="text-[22px] font-bold text-gray-800">
              Delete Note <span className="text-[#578df5]">“{deleteNote.title}”</span>
            </h3>
            <p className="text-gray-600 text-[16px] my-3 leading-[1.6]">
              Are you sure you want to permanently delete this note?
            </p>
            <div className="flex justify-center gap-3 mt-5">
              <button 
                onClick={handleDelete}
                className="w-[45%] py-2 bg-[#f55757] text-white rounded-md font-semibold shadow-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
              <button 
                onClick={() => setDeleteNote(null)}
                className="w-[45%] py-2 bg-[#578df5] text-white rounded-md font-semibold shadow-md hover:bg-blue-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
