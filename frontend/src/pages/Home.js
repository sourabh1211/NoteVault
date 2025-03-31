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
    
      <div className='min-h-screen flex flex-col'>
        <div className='mt-8 flex items-center justify-between w-full px-10 lg:px-16'>
          <h1 className='text-4xl font-bold text-gray-800'>Hello, {userData ? userData.name : ""}</h1>
          <div className="relative w-[400px]">
            <input 
              onKeyUp={(e) => { if (e.key === "Enter") navigate(`/search?query=${query}`); }} 
              onChange={(e) => setQuery(e.target.value)} 
              value={query} 
              type="text" 
              placeholder='Search Notes' 
              className='w-full p-4 rounded-lg text-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105' 
            />
          </div>
        </div>

        {/* Scrollable notes section */}
        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10 py-6">
            {data ? (
              data.map((el, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
                  <Note index={index} note={el} setDeleteNote={setDeleteNote} />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Oops 
                  title={"No Notes Found"} 
                  image={require("../Images/oops2.png")} 
                  buttonTitle={"Add Note"} 
                  buttonLink={"/addNewNote"} 
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Sticky footer */}
        <Fotter />
      </div>

      {deleteNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[30vw] h-auto text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Delete Note <span className="text-blue-500">“{deleteNote.title}”</span>
            </h3>
            <p className="text-gray-600 text-lg my-3 leading-7">
              Are you sure you want to delete this note?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={handleDelete}
                className="w-[45%] py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-500 transition-all">
                Delete
              </button>
              <button 
                onClick={() => setDeleteNote(null)}
                className="w-[45%] py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-500 transition-all">
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
