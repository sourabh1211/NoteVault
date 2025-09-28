// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Note from '../components/Note'
// import Fotter from '../components/Fotter'
// import Oops from '../components/Oops'
// import { useNavigate } from 'react-router-dom'

// const Home = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [deleteNote, setDeleteNote] = useState(null);
  
//   let getNotes = () => {
//     fetch("https://notesapp-1-56xy.onrender.com/getNotes", {
//       mode: "cors",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: localStorage.getItem("userID") })
//     })
//     .then(resp => resp.json())
//     .then(data => {
//       if (data.success === false) setError(data.msg);
//       else setData(data);
//     });
//   };
  
//   function getUserDetails() {
//     fetch("https://notesapp-1-56xy.onrender.com/getUserDetails", {
//       mode: "cors",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: localStorage.getItem("userID") })
//     })
//     .then(resp => resp.json())
//     .then(data => {
//       if (data.success === false) navigate("/login");
//       else setUserData(data);
//     })
//   }
//   useEffect(() => {
//     getNotes();
//     getUserDetails();
//   }, []);
  
//   const handleDelete = () => {
//     if (!deleteNote) return;
//     fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ noteId: deleteNote._id })
//     })
//       .then(resp => resp.json())
//       .then(data => {
//         if (data.success) {
//           setDeleteNote(null);
//           window.location.reload();
//         } else {
//           alert("Something went wrong");
//         }
//       })
//       .catch(err => console.log(err));
//   };
  
//   return (
//     <>
//       <Navbar />
    
//       <div className='mt-6 flex items-center justify-between w-screen px-12'>
//         <h1 className='text-3xl font-semibold text-gray-700'>Hi, {userData ? userData.name : ""}</h1>
//         <div className="relative w-[380px]">
//           <input 
//             onKeyUp={(e) => { if (e.key === "Enter") navigate(`/search?query=${query}`); }} 
//             onChange={(e) => setQuery(e.target.value)} 
//             value={query} 
//             type="text" 
//             placeholder='Search Notes' 
//             className='w-full p-3 rounded-lg text-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 transform hover:scale-105' 
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-12 py-6">
//         {data ? (
//           data.map((el, index) => (
//             <div key={index} className="bg-white p-4 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105">
//               <Note index={index} note={el} setDeleteNote={setDeleteNote} />
//             </div>
//           ))
//         ) : (
//           <div className="flex justify-center items-center w-full">
//             <Oops 
//               title={"No Note Found"} 
//               image={require("../Images/oops2.png")} 
//               buttonTitle={"Add Note"} 
//               buttonLink={"/addNewNote"} 
//             />
//           </div>
//         )}
//       </div>
          
//       <Fotter />
          
//       {deleteNote && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md z-[99999]">
//           <div className="bg-white rounded-lg shadow-lg p-5 w-[28vw] h-auto text-center">
//             <h3 className="text-[20px] font-semibold">
//               Delete Note <span className="text-[#578df5]">“{deleteNote.title}”</span>
//             </h3>
//             <p className="text-gray-600 text-[16px] my-2 leading-[1.5]">
//               Do you want to delete this note?
//             </p>
//             <div className="flex justify-center gap-2 mt-4">
//               <button 
//                 onClick={handleDelete}
//                 className="w-[45%] py-2 bg-[#f55757] text-white rounded-md font-medium"
//               >
//                 Delete
//               </button>
//               <button 
//                 onClick={() => setDeleteNote(null)}
//                 className="w-[45%] py-2 bg-[#578df5] text-white rounded-md font-medium">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// export default Home;






import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Fotter from "../components/Fotter";
import Oops from "../components/Oops";
import { useNavigate } from "react-router-dom";

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
      body: JSON.stringify({ userId: localStorage.getItem("userID") }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success === false) setError(data.msg);
        else setData(data);
      });
  };

  function getUserDetails() {
    fetch("https://notesapp-1-56xy.onrender.com/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userID") }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success === false) navigate("/login");
        else setUserData(data);
      });
  }

  useEffect(() => {
    getNotes();
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    if (!deleteNote) return;
    fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId: deleteNote._id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setDeleteNote(null);
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b12]">
      <Navbar />

      {/* Background: two-color glow, grid, soft orbs */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b12] via-[#170f22] to-[#0b0b12]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#6b21a8_0%,#1e1b4b_50%,#6b21a8_100%)] opacity-30 mix-blend-plus-lighter animate-bgPhase" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)] bg-[linear-gradient(#ffffff12_1px,transparent_1px),linear-gradient(90deg,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
        {[...Array(6)].map((_, i) => (
          <span
            key={`orb-${i}`}
            className="absolute h-28 w-28 rounded-full blur-2xl opacity-25 bg-fuchsia-500/30 animate-fairy"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
          />
        ))}
      </div>

      {/* Header + search */}
      <div className="relative z-10 mt-6 flex w-screen items-center justify-between px-6 sm:px-10 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Hi, {userData ? userData.name : ""}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="relative w-[92%] max-w-md sm:w-[420px]"
        >
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") navigate(`/search?query=${query}`);
            }}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="Search Notes"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-lg text-white placeholder-white/50 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40 hover:border-violet-300/30"
          />
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition group-hover:opacity-40" style={{ background: "radial-gradient(120px_60px_at_80%_50%,rgba(139,92,246,.35),transparent)" }} />
        </motion.div>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-2 md:grid-cols-3 sm:px-10 lg:px-12">
        {data ? (
          data.map((el, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.25) }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition hover:border-violet-400/40 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.4)]"
            >
              <Note index={index} note={el} setDeleteNote={setDeleteNote} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex w-full justify-center">
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

      {/* Delete modal */}
      {deleteNote && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] max-w-md rounded-2xl border border-white/10 bg-[#0f0b17]/80 p-5 text-center text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl"
          >
            <h3 className="text-[20px] font-semibold">
              Delete Note <span className="text-violet-300">“{deleteNote.title}”</span>
            </h3>
            <p className="my-3 text-white/75">Do you want to delete this note?</p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={handleDelete}
                className="w-[46%] rounded-md bg-rose-600 px-4 py-2 font-medium text-white shadow hover:bg-rose-500"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteNote(null)}
                className="w-[46%] rounded-md bg-violet-600 px-4 py-2 font-medium text-white shadow hover:bg-violet-500"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* keyframes */}
      <style>{`
        @keyframes bgPhase { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .animate-bgPhase{ animation:bgPhase 30s linear infinite; }
        @keyframes fairy { 0%{ transform:translate3d(0,0,0) scale(1);} 50%{ transform:translate3d(12px,-18px,0) scale(1.05);} 100%{ transform:translate3d(0,0,0) scale(1);} }
        .animate-fairy{ animation: fairy 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Home;
