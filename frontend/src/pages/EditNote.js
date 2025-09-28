// import React, { useState, useRef, useEffect } from 'react';
// import JoditEditor from 'jodit-react';
// import Navbar from '../components/Navbar';
// import CheckBox from '../tools/checkBox';
// import { json, useNavigate, useParams } from 'react-router-dom';
// const EditNote = () => {
//   let { id } = useParams();
//   const editorRef = useRef(null);
//   const [content, setContent] = useState('');
//   const [title, setTitle] = useState("")
//   const [desc, setDesc] = useState("")
//   const [isImportant, setIsImportant] = useState(false);
//   let navigate = useNavigate();
//   const submitForm = (e) => {
//     e.preventDefault();
//     let res = fetch("https://notesapp-1-56xy.onrender.com/updateNote", {
//       mode: "cors",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: title, description: desc, content: content, isImportant: isImportant, uploadedBy: localStorage.getItem("userID"), noteId: id })
//     }).then(response => response.json()).then(data => {
//       if (data.success) {
//         alert("Note Updated Successfully")
//         navigate("/");
//       }
//       else {
//         alert("Error Adding Note..!")
//       }
//     })
//   };
//   const getNote = () => {
//      let res = fetch("https://notesapp-1-56xy.onrender.com/getNote", {
//       mode: "cors",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ noteId: id })
//      }).then(response => response.json()).then(data => {
//       setTitle(data.title);
//       setDesc(data.description);
//       setContent(data.content);
//       setIsImportant(data.isImportant);
//      })
//   };
//   useEffect(() => {
//     getNote()
//   }, [])
//   return (
//     <>
//       <Navbar />
//       <div className="EditNoteCon min-h-screen px-[50px]">
//         <form onSubmit={submitForm} className="my-5">
//           <h3 className="m-0 p-0 text-2xl mb-5">Edit Note</h3>
//           <div className="inputBox !block !bg-transparent">
//             <label htmlFor="title" className="my-2">Enter A Note Title</label>
//             <input
//               type="text"
//               placeholder="Note Title"
//               className="w-full p-2 rounded-md mt-1"
//               style={{ border: "2px solid #555" }}
//               name="title"
//               id="title"
//               onChange={(e) => { setTitle(e.target.value) }}
//               value={title}
//               required
//             />
//           </div>
//           <div className="inputBox !block !bg-transparent">
//             <label htmlFor="description" className="my-2">Enter A Note Description</label>
//             <textarea
//               type="text"
//               placeholder="Note Description"
//               className="w-full p-2 rounded-md mt-1 min-h-[100px]"
//               style={{ border: "2px solid #555" }}
//               name="description"
//               id="description"
//               onChange={(e) => { setDesc(e.target.value) }}
//               value={desc}
//               required
//             ></textarea>
//           </div>
//           <CheckBox title="is Important" check={isImportant} setCheck={setIsImportant} />
//           <JoditEditor
//             ref={editorRef}
//             value={content}
//             tabIndex={1}
//             onChange={newContent => setContent(newContent)}
//           />
//           <button className="btnNormal my-3 !min-w-[200px]" type="submit">Update Note</button>
//         </form>
//       </div>

//     </>
//   );
// };
// export default EditNote;












import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import CheckBox from "../tools/checkBox";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  let { id } = useParams();
  const editorRef = useRef(null);
  const shellRef = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [sparks, setSparks] = useState([]); // cursor sprinkles
  let navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch("https://notesapp-1-56xy.onrender.com/updateNote", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: desc,
        content: content,
        isImportant: isImportant,
        uploadedBy: localStorage.getItem("userID"),
        noteId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Note Updated Successfully");
          navigate("/");
        } else {
          alert("Error Adding Note..!");
        }
      });
  };

  const getNote = () => {
    fetch("https://notesapp-1-56xy.onrender.com/getNote", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDesc(data.description);
        setContent(data.content);
        setIsImportant(data.isImportant);
      });
  };

  useEffect(() => {
    getNote();
  }, []);

  const onMove = (e) => {
    const el = shellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    const id = Math.random().toString(36).slice(2);
    setSparks((prev) => {
      const next = [...prev, { id, x, y }];
      return next.length > 24 ? next.slice(next.length - 24) : next;
    });
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, 800);
  };

  return (
    <div
      ref={shellRef}
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden bg-[#0b0b12]"
    >
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b12] via-[#170f22] to-[#0b0b12]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#6b21a8_0%,#1e1b4b_50%,#6b21a8_100%)] opacity-30 mix-blend-plus-lighter animate-bgPhase" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(200px 200px at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.20), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)] bg-[linear-gradient(#ffffff12_1px,transparent_1px),linear-gradient(90deg,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl ring-1 ring-white/10 sm:p-8"
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
              Edit Note
            </h3>
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:border-violet-400/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              Go Back
            </motion.button>
          </div>

          <form onSubmit={submitForm} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <motion.div className="group relative">
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-white/80">
                  Enter a Note Title
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="peer w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white placeholder-white/50 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </motion.div>

              <motion.div className="group relative">
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-white/80">
                  Enter a Note Description
                </label>
                <textarea
                  placeholder="Note Description"
                  className="min-h-[100px] w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white placeholder-white/50 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40"
                  name="description"
                  id="description"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  required
                />
              </motion.div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 text-white">
              <CheckBox title="Is Important" check={isImportant} setCheck={setIsImportant} className="!text-white font-semibold" />
            </div>

            {/* Editor */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f0b17]/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                <div className="flex items-center gap-2 text-white/80">
                  <span className="h-2 w-2 rounded-full bg-fuchsia-400/80" />
                  <span className="text-sm">Rich Text Editor</span>
                </div>
                <div className="text-xs text-white/50">Jodit</div>
              </div>
              <div className="jodit-wrapper">
                <JoditEditor
                  ref={editorRef}
                  value={content}
                  tabIndex={1}
                  onChange={(newContent) => setContent(newContent)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-violet-700 p-[2px]"
              >
                <span className="absolute inset-0 animate-pulse bg-[radial-gradient(120px_60px_at_var(--mx,50%)_0%,rgba(255,255,255,0.08),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative block w-full rounded-[10px] bg-[#0f0b17]/90 px-5 py-3 text-center font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur">
                  Update Note
                </span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate("/")}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/90 backdrop-blur hover:border-violet-400/40 hover:text-white"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(16)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40 shadow-[0_0_20px_2px_rgba(168,85,247,0.35)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -30 - ((i % 5) * 10), 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
          />
        ))}
      </div>

      {/* fairy orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(6)].map((_, i) => (
          <span
            key={`orb-${i}`}
            className="absolute h-28 w-28 rounded-full blur-2xl opacity-25 bg-fuchsia-500/30 animate-fairy"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
          />
        ))}
      </div>

      {/* cursor sparks */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="pointer-events-none absolute block h-1.5 w-1.5 animate-spark rounded-full bg-white/80 shadow-[0_0_14px_2px_rgba(168,85,247,0.45)]"
            style={{ left: s.x, top: s.y }}
          />)
        )}
      </div>

      <style>{`
        @keyframes bgPhase { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .animate-bgPhase{ animation:bgPhase 30s linear infinite; }
        @keyframes spark { 0%{ transform:translate(-50%,-50%) scale(1); opacity:1;} 100%{ transform:translate(-50%,-80%) scale(0.2); opacity:0;} }
        .animate-spark{ animation: spark .8s ease-out forwards; }
        @keyframes fairy { 0%{ transform:translate3d(0,0,0) scale(1);} 50%{ transform:translate3d(12px,-18px,0) scale(1.05);} 100%{ transform:translate3d(0,0,0) scale(1);} }
        .animate-fairy{ animation: fairy 12s ease-in-out infinite; }

        .jodit-wrapper .jodit-container { background: transparent !important; color: #fff !important; border: none !important; }
        .jodit-wrapper .jodit-toolbar__box, .jodit-wrapper .jodit-status-bar { background: rgba(255,255,255,0.05) !important; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08) !important; }
        .jodit-wrapper .jodit-toolbar__box:not(:empty){ border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
        .jodit-wrapper .jodit-toolbar-button__button { color: rgba(255,255,255,0.85) !important; }
        .jodit-wrapper .jodit-toolbar-button__button:hover { background: rgba(139,92,246,0.18) !important; }
        .jodit-wrapper .jodit-wysiwyg, .jodit-wrapper .jodit-workplace { background: transparent !important; color: #fff !important; }
        .jodit-wrapper .jodit-ui-separator { background: rgba(255,255,255,0.12) !important; }
        .jodit-wrapper .jodit-add-new-line { background: rgba(255,255,255,0.05) !important; }
        .jodit-wrapper .jodit-toolbar-editor-collection_mode_fullsize{ background: rgba(15,11,23,0.9) !important; }
      `}</style>
    </div>
  );
};

export default EditNote;

