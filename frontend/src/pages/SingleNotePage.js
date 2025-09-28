// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Fotter from '../components/Fotter';
// import { useNavigate, useParams } from 'react-router-dom';
// import parse from 'html-react-parser';
// const SingleNotePage = () => {
//   let { id } = useParams();
//   const [data, setData] = useState(null);
//   const [deleteNote, setDeleteNote] = useState(null);
//   const navigate = useNavigate();
  
//   function getNote() {
//     fetch("https://notesapp-1-56xy.onrender.com/getNote", {
//       mode: "cors",
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ noteId: id })
//     })
//       .then(res => res.json())
//       .then(data => setData(data));
//   }
  
//   const editNote = () => {
//     navigate(`/editNote/${id}`);
//   };
  
//   const handleDelete = () => {
//     if (!deleteNote) return;
//     fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
//       mode: "cors",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ noteId: id })
//     })
//       .then(resp => resp.json())
//       .then(data => {
//         if (data.success) {
//           setDeleteNote(null);
//           navigate("/");
//         } else {
//           alert("Something went wrong");
//         }
//       })
//       .catch(err => console.log(err));
//   };
//   useEffect(() => {
//     getNote();
//   }, []);
  
//   return (
//     <>
//       <Navbar />
//       <div className="container px-[50px] w-screen min-h-[68vh] h-auto">
//         <div className="flex items-start justify-between h-auto my-3">
//           <div className="left w-[80%] h-full">
//             <h3 className='m-0 p-0 text-3xl text-[#000] line-clamp-1 min-w-[90%]'>
//               {data ? data.title : ""}
//             </h3>
//             <p className='text-[gray]'>
//               {data ? new Date(data.date).toDateString() : ""}
//             </p>
//           </div>
//           <div className="right flex items-start gap-1 w-[20%] h-full justify-end">
//             <img className='w-[30px] h-[30px] cursor-pointer' onClick={() => setDeleteNote(data)} src={require("../Images/delete.png")} alt="" />
//             <img className='w-[35px] h-[35px] cursor-pointer' onClick={editNote} src={require("../Images/edit.png")} alt="" />
//           </div>
//         </div>
//         <p className='text-gray'>{data ? data.description : ""}</p>
//         <div className='my-3 w-full'>
//           {parse(data ? data.content : "")}
//         </div>
//       </div>
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
//                 className="w-[45%] py-2 bg-[#f55757] text-white rounded-md font-medium">
//                 Delete
//               </button>
//               <button 
//                 onClick={() => setDeleteNote(null)}
//                 className="w-[45%] py-2 bg-[#578df5] text-white rounded-md font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <Fotter />
//     </>
//   );
// };

// export default SingleNotePage;




import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

const SingleNotePage = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);
  const navigate = useNavigate();

  function getNote() {
    fetch("https://notesapp-1-56xy.onrender.com/getNote", {
      mode: "cors",
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ noteId: id }),
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  const editNote = () => {
    navigate(`/editNote/${id}`);
  };

  const handleDelete = () => {
    if (!deleteNote) return;
    fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId: id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setDeleteNote(null);
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b12]">
      <Navbar />

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b12] via-[#170f22] to-[#0b0b12]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#6b21a8_0%,#1e1b4b_50%,#6b21a8_100%)] opacity-30 mix-blend-plus-lighter animate-bgPhase" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)] bg-[linear-gradient(#ffffff12_1px,transparent_1px),linear-gradient(90deg,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl ring-1 ring-white/10 sm:p-8"
        >
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="w-[80%]">
              <h3 className="m-0 line-clamp-2 p-0 text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl">
                {data ? data.title : ""}
              </h3>
              <p className="mt-1 text-sm text-white/60">
                {data ? new Date(data.date).toDateString() : ""}
              </p>
            </div>
            <div className="flex w-[20%] items-start justify-end gap-2">
              <img
                className="h-[34px] w-[34px] cursor-pointer rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur hover:border-rose-300/40 hover:bg-rose-500/10"
                onClick={() => setDeleteNote(data)}
                src={require("../Images/delete.png")}
                alt="delete"
                title="Delete"
              />
              <img
                className="h-[38px] w-[38px] cursor-pointer rounded-lg border border-white/10 bg-white/5 p-1.5 backdrop-blur hover:border-violet-300/40 hover:bg-violet-500/10"
                onClick={editNote}
                src={require("../Images/edit.png")}
                alt="edit"
                title="Edit"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-white/75">{data ? data.description : ""}</p>

          {/* Content */}
          <div className="prose prose-invert prose-violet my-5 max-w-none">
            {parse(data ? data.content : "")}
          </div>
        </motion.div>

        <div className="mt-10">
          <Fotter />
        </div>
      </div>

      {/* Fairy orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(6)].map((_, i) => (
          <span
            key={`orb-${i}`}
            className="absolute h-28 w-28 rounded-full blur-2xl opacity-25 bg-fuchsia-500/30 animate-fairy"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
          />
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes bgPhase { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .animate-bgPhase{ animation:bgPhase 30s linear infinite; }
        @keyframes fairy { 0%{ transform:translate3d(0,0,0) scale(1);} 50%{ transform:translate3d(12px,-18px,0) scale(1.05);} 100%{ transform:translate3d(0,0,0) scale(1);} }
        .animate-fairy{ animation: fairy 12s ease-in-out infinite; }
        /* prose tailwind typograhy inverted */
        .prose :where(a):not(:where([class~="not-prose"] *)) { color: rgb(196 181 253); }
        .prose :where(h1,h2,h3,h4):not(:where([class~="not-prose"] *)) { color: white; }
        .prose :where(code):not(:where([class~="not-prose"] *)) { background: rgba(255,255,255,0.07); padding: 0.15rem 0.35rem; border-radius: 0.35rem; }
        .prose :where(blockquote):not(:where([class~="not-prose"] *)) { border-left-color: rgba(139,92,246,0.55); }
      `}</style>
    </div>
  );
};

export default SingleNotePage;
