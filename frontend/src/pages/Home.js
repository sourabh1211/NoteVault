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
    
      <div className='mt-8 flex items-center justify-between w-full px-16 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-b-[2rem] shadow-lg'>
        <h1 className='text-4xl font-bold text-white drop-shadow-lg hover:text-gray-200 transition-colors'>
          Hi, {userData ? userData.name : "Loading..."}
        </h1>
        <div className="relative w-[380px]">
          <input 
            onKeyUp={(e) => { if (e.key === "Enter") navigate(`/search?query=${query}`); }} 
            onChange={(e) => setQuery(e.target.value)} 
            value={query} 
            type="text" 
            placeholder='Search Notes' 
            className='w-full p-4 rounded-full text-lg border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 text-white placeholder-white placeholder-opacity-70 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-80'
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-16 py-12">
        {data ? (
          data.map((el, index) => (
            <div key={index} className="bg-gradient-to-br from-green-400 via-teal-500 to-cyan-600 p-6 rounded-xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-opacity-80">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 w-[28vw] h-auto text-center transform scale-110 transition-transform duration-300 ease-in-out">
            <h3 className="text-[22px] font-semibold text-white drop-shadow-lg">
              Delete Note <span className="text-[#FFD700]">“{deleteNote.title}”</span>
            </h3>
            <p className="text-gray-100 text-[16px] my-3 leading-[1.5]">
              Do you want to delete this note permanently?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={handleDelete}
                className="w-[45%] py-3 bg-[#f55757] text-white rounded-md font-medium hover:bg-[#ff3333] transition-all">
                Delete
              </button>
              <button 
                onClick={() => setDeleteNote(null)}
                className="w-[45%] py-3 bg-[#578df5] text-white rounded-md font-medium hover:bg-[#3365cc] transition-all">
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
