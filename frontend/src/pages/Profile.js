import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Fotter from '../components/Fotter';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [notes, setNotes] = useState([]);
  const [importantNotes, setImportantNotes] = useState([]);
  const [normalNotes, setNormalNotes] = useState([]);
  const [deleteNote, setDeleteNote] = useState(null);
  const navigate = useNavigate();

  function getUserDetails() {
    fetch("https://notesapp-1-56xy.onrender.com/getUserDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userID") }),
    })
      .then(res => res.json())
      .then(data => setUserDetails(data))
      .catch(error => console.error("Error fetching user details:", error));
  }

  function getNotes() {
    fetch("https://notesapp-1-56xy.onrender.com/getNotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userID") }),
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotes(data);
          setImportantNotes(data.filter(note => note.isImportant));
          setNormalNotes(data.filter(note => !note.isImportant));
        } else {
          setNotes([]);
          setImportantNotes([]);
          setNormalNotes([]);
        }
      })
      .catch(() => {
        setNotes([]);
        setImportantNotes([]);
        setNormalNotes([]);
      });
  }

  useEffect(() => {
    getUserDetails();
    getNotes();
  }, []);

  const handleDelete = () => {
    if (!deleteNote) return;
    fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId: deleteNote._id }),
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setDeleteNote(null);
          getNotes();
        } else {
          alert("Something went wrong");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full py-12 bg-gradient-to-br from-slate-700 via-gray-800 to-gray-900 text-white shadow-xl">
        <Avatar name={userDetails?.name || ""} size="160" round="50%" className="shadow-lg border-4 border-white" />
        <h2 className="mt-6 text-3xl font-bold tracking-wide">{userDetails?.name || ""}</h2>
        <p className="text-md opacity-70">Joined on {userDetails ? new Date(userDetails.date).toDateString() : ""}</p>
        <button
          onClick={() => {
            localStorage.removeItem("userID");
            navigate("/login");
          }}
          className="mt-5 px-6 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg font-medium shadow-md"
        >
          Logout
        </button>
      </div>

      <section className="w-full px-6 sm:px-10 py-10 bg-gray-100">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your <span className="text-indigo-600">Important</span> Notes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {importantNotes.length > 0 ? importantNotes.map((note, index) => (
            <Note key={note._id} note={note} index={index} setDeleteNote={setDeleteNote} />
          )) : (
            <p className="col-span-full text-center text-gray-500">No important notes found.</p>
          )}
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 py-10 bg-white">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your <span className="text-blue-500">Normal</span> Notes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {normalNotes.length > 0 ? normalNotes.map((note, index) => (
            <Note key={note._id} note={note} index={index} setDeleteNote={setDeleteNote} />
          )) : (
            <p className="col-span-full text-center text-gray-500">No normal notes found.</p>
          )}
        </div>
      </section>

      <Fotter />

      {deleteNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[99999]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[400px] text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Delete Note <span className="text-indigo-600">“{deleteNote.title}”</span>
            </h3>
            <p className="text-gray-600 mt-2 mb-4 text-sm">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="w-1/2 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteNote(null)}
                className="w-1/2 py-2 bg-gray-300 hover:bg-gray-400 transition text-gray-800 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
