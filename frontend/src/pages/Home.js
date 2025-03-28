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
    
      <div className='mt-10 flex items-center justify-between w-full px-10 md:px-20'>
        <h1 className='text-4xl font-bold text-gray-800 tracking-wide drop-shadow-md'>
          Welcome back, <span className="text-blue-500">{userData ? userData.name : ""}</span>
        </h1>
        <div className="relative w-[300px] md:w-[400px]">
          <input 
            onKeyUp={(e) => { if (e.key === "Enter") navigate(`/search?query=${query}`); }} 
            onChange={(e) => setQuery(e.target.value)} 
            value={query} 
            type="text" 
            placeholder='Search your notes... ✍️' 
            className='w-full p-4 rounded-xl text-base border border-gray-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-white via-gray-50 to-white'
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10 md:px-20 py-10">
        {data ? (
          data.map((el, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 transition-transform duration-300 transform hover:scale-[1.04] hover:shadow-blue-200">
              <Note index={index} note={el} setDeleteNote={setDeleteNote} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center w-full">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-[99999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[85%] md:w-[28vw] max-w-md text-center">
            <h3 className="text-xl font-bold text-gray-800">
              Delete Note <span className="text-[#578df5]">“{deleteNote.title}”</span>
            </h3>
            <p className="text-gray-600 text-base mt-2 mb-4 leading-[1.6]">
              Are you sure you want to delete this note? This action can't be undone.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button 
                onClick={handleDelete}
                className="w-[45%] py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg font-semibold shadow-md"
              >
                Delete
              </button>
              <button 
                onClick={() => setDeleteNote(null)}
                className="w-[45%] py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg font-semibold shadow-md">
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
