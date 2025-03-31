import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Fotter from '../components/Fotter';
import Oops from '../components/Oops';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);

  let getNotes = () => {
    fetch('https://notesapp-1-56xy.onrender.com/getNotes', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: localStorage.getItem('userID') })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success === false) setError(data.msg);
      else setData(data);
    });
  };

  function getUserDetails() {
    fetch('https://notesapp-1-56xy.onrender.com/getUserDetails', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: localStorage.getItem('userID') })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success === false) navigate('/login');
      else setUserData(data);
    });
  }

  useEffect(() => {
    getNotes();
    getUserDetails();
  }, []);

  const handleDelete = () => {
    if (!deleteNote) return;
    fetch('https://notesapp-1-56xy.onrender.com/deleteNote', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ noteId: deleteNote._id })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success) {
        setDeleteNote(null);
        window.location.reload();
      } else {
        alert('Something went wrong');
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />

      {/* Background with particle animation or subtle gradient */}
      <div className='absolute inset-0 bg-gradient-to-tl from-[#121212] via-[#1f1f1f] to-[#292929] z-[-1]'>
        {/* You can integrate a particles.js background here */}
      </div>

      <div className='mt-16 flex items-center justify-between w-full px-16'>
        <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff] tracking-wide'>
          Hi, {userData ? userData.name : 'Loading...'}
        </h1>
        <div className='relative w-[380px]'>
          <input
            onKeyUp={(e) => { if (e.key === 'Enter') navigate(`/search?query=${query}`); }}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type='text'
            placeholder='Search Notes'
            className='w-full p-4 rounded-full text-lg border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 text-white placeholder-opacity-70 bg-[#292929] transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-80 hover:border-[#00c6ff]'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-16 py-12'>
        {data ? (
          data.map((el, index) => (
            <div key={index} className='bg-gradient-to-r from-[#43e97b] via-[#38f9d7] to-[#23d5ab] p-6 rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-opacity-80'>
              <Note index={index} note={el} setDeleteNote={setDeleteNote} />
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center w-full'>
            <Oops
              title={'No Note Found'}
              image={require('../Images/oops2.png')}
              buttonTitle={'Add Note'}
              buttonLink={'/addNewNote'}
            />
          </div>
        )}
      </div>

      <Fotter />

      {/* Delete confirmation modal with floating animation */}
      {deleteNote && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50'>
          <div className='bg-gradient-to-tl from-[#ff7e5f] to-[#feb47b] rounded-xl p-6 w-[28vw] h-auto text-center transform scale-110 transition-transform duration-300 ease-in-out'>
            <h3 className='text-[22px] font-semibold text-white drop-shadow-lg'>
              Delete Note <span className='text-[#FFD700]'>“{deleteNote.title}”</span>
            </h3>
            <p className='text-gray-100 text-[16px] my-3 leading-[1.5]'>
              Do you want to delete this note permanently?
            </p>
            <div className='flex justify-center gap-4 mt-4'>
              <button
                onClick={handleDelete}
                className='w-[45%] py-3 bg-[#f55757] text-white rounded-md font-medium hover:bg-[#ff3333] transition-all transform hover:scale-105'>
                Delete
              </button>
              <button
                onClick={() => setDeleteNote(null)}
                className='w-[45%] py-3 bg-[#578df5] text-white rounded-md font-medium hover:bg-[#3365cc] transition-all transform hover:scale-105'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
