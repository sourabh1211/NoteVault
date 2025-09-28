// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Note from '../components/Note';
// import Fotter from '../components/Fotter';
// import Oops from '../components/Oops';
// import oopsImg from "../Images/oops2.png";
// import { useSearchParams } from 'react-router-dom';
// const SearchPage = () => {
//   const [searchParams] = useSearchParams();
//   const myParam = searchParams.get('query');
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     getNotes();
//   }, []);
//   useEffect(() => {
//     if (data.length > 0 && myParam) {
//       const filtered = data.filter(note => 
//         note.title.toLowerCase().includes(myParam.toLowerCase()) || 
//         note.description.toLowerCase().includes(myParam.toLowerCase()) ||
//         note.content.toLowerCase().includes(myParam.toLowerCase())
//       );
//       setFilteredData(filtered);
//       console.log('Filtered Data:', filtered);
//     } else {
//       setFilteredData([]);
//     }
//   }, [data, myParam]);
//   const getNotes = () => {
//     fetch("https://notesapp-1-56xy.onrender.com/getNotes", {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         userId: localStorage.getItem("userID")
//       })
//     })
//     .then(resp => resp.json())
//     .then(responseData => {
//       if (responseData.success === false) {
//         setError(responseData.msg);
//       } else {
//         console.log('Fetched Data:', responseData);
//         setData(responseData);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching notes:', error);
//       setError('Failed to fetch notes.');
//     });
//   };

//   return (
//     <>
//       <Navbar/>
//       <div className="div flex items-center pr-5 pt-4 justify-end">
//         <div className="inputBox !w-[400px] !p-[5px]">
//           <input type="text" placeholder='Search Notes' />
//         </div>
//       </div>
//       <div className="gridItems gridOne">
//         {
//           error ? 
//             <Oops title={error} image={oopsImg} buttonTitle="Go Back" buttonLink="/" /> :
//             (!myParam || (filteredData && filteredData.length === 0)) ? 
//               <Oops title={`No Search Results Found for "${myParam || ''}"`} image={oopsImg} buttonTitle="Go Back" buttonLink="/" /> :
//               filteredData.map((el, index) => (
//                 <Note key={el._id} index={index} note={el} height="180px" />
//               ))
//         }
//       </div>
//       <Fotter/>
//     </>
//   );
// };
// export default SearchPage;






import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Fotter from "../components/Fotter";
import Oops from "../components/Oops";
import oopsImg from "../Images/oops2.png";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const myParam = searchParams.get("query");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (data.length > 0 && myParam) {
      const filtered = data.filter(
        (note) =>
          note.title.toLowerCase().includes(myParam.toLowerCase()) ||
          note.description.toLowerCase().includes(myParam.toLowerCase()) ||
          note.content.toLowerCase().includes(myParam.toLowerCase())
      );
      setFilteredData(filtered);
      console.log("Filtered Data:", filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, myParam]);

  const getNotes = () => {
    fetch("https://notesapp-1-56xy.onrender.com/getNotes", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID"),
      }),
    })
      .then((resp) => resp.json())
      .then((responseData) => {
        if (responseData.success === false) {
          setError(responseData.msg);
        } else {
          console.log("Fetched Data:", responseData);
          setData(responseData);
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setError("Failed to fetch notes.");
      });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b12]">
      <Navbar />

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b12] via-[#170f22] to-[#0b0b12]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#6b21a8_0%,#1e1b4b_50%,#6b21a8_100%)] opacity-30 mix-blend-plus-lighter animate-bgPhase" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)] bg-[linear-gradient(#ffffff12_1px,transparent_1px),linear-gradient(90deg,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6">
        {/* Top search bar */}
        <div className="mb-6 flex items-center justify-end pr-1 sm:pr-2">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-md"
          >
            <div className="inputBox !w-full !p-0">
              <input
                type="text"
                placeholder="Search Notes"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder-white/50 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40"
              />
            </div>
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition group-hover:opacity-40" style={{ background: "radial-gradient(120px_60px_at_80%_50%,rgba(139,92,246,.35),transparent)"}} />
          </motion.div>
        </div>

        {/* Results grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="gridItems gridOne"
        >
          {error ? (
            <Oops title={error} image={oopsImg} buttonTitle="Go Back" buttonLink="/" />
          ) : !myParam || (filteredData && filteredData.length === 0) ? (
            <Oops
              title={`No Search Results Found for "${myParam || ""}"`}
              image={oopsImg}
              buttonTitle="Go Back"
              buttonLink="/"
            />
          ) : (
            filteredData.map((el, index) => (
              <motion.div
                key={el._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
              >
                <Note index={index} note={el} height="180px" />
              </motion.div>
            ))
          )}
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

      <style>{`
        @keyframes bgPhase { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .animate-bgPhase{ animation:bgPhase 30s linear infinite; }
        @keyframes fairy { 0%{ transform:translate3d(0,0,0) scale(1);} 50%{ transform:translate3d(12px,-18px,0) scale(1.05);} 100%{ transform:translate3d(0,0,0) scale(1);} }
        .animate-fairy{ animation: fairy 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SearchPage;
