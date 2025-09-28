// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import SignUpimg from '../Images/signupimg.jpg';
// const SignUp = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState('');
  
//   let navigate = useNavigate();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let res = await fetch('https://notesapp-1-56xy.onrender.com/signUp', {
//       mode: 'cors',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, password, username }),
//     });
//     let data = await res.json();
//     console.log(data);
//     if (data.success === true) {
//       alert('Registration successful');
//       navigate('/login');
//     } else {
//       setError(data.message);
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex bg-white p-8 shadow-lg rounded-xl max-w-4xl w-full">
//         <div className="w-1/2 flex justify-center items-center">
//           <img src={SignUpimg} alt="Sign Up" className="w-full transition-transform duration-300 hover:scale-105" />
//         </div>
//         <div className="w-1/2 flex flex-col justify-center p-6">
//           <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               onChange={(e) => setUsername(e.target.value)}
//               value={username}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               required
//             />
//             <button
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
//               type="submit"
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="text-center mt-4">
//             Already Have An Account?{' '}
//             <Link className="text-blue-500 hover:underline" to="/login">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SignUpimg from "../Images/signupimg.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("https://notesapp-1-56xy.onrender.com/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, username }),
    });
    let data = await res.json();
    console.log(data);
    if (data.success === true) {
      alert("Registration successful");
      navigate("/login");
    } else {
      setError(data.message);
      alert(data.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0b12] via-[#170f22] to-[#0b0b12]">
      {/* Decorative grid + glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#6b21a8_0%,transparent_35%),radial-gradient(circle_at_80%_20%,#4c1d95_0%,transparent_40%),radial-gradient(circle_at_50%_90%,#1e1b4b_0%,transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(transparent,transparent),linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)] bg-[length:100%_100%,24px_24px,24px_24px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl ring-1 ring-white/10 md:grid-cols-2"
        >
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative h-72 w-full overflow-hidden md:h-full"
          >
            <img
              src={SignUpimg}
              alt="Sign Up"
              className="h-full w-full object-cover"
            />
            {/* overlay tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-[#0b0b12]/20 to-transparent mix-blend-multiply" />
            {/* glossy highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
          </motion.div>

          {/* Right: Form */}
          <div className="relative flex flex-col justify-center p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-center text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl"
            >
              Create your account
            </motion.h2>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              <div className="group relative">
                <input
                  type="text"
                  placeholder="Username"
                  aria-label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="peer w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white placeholder-white/50 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40"
                />
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition group-hover:opacity-40 group-hover:blur-3xl group-focus-within:opacity-60" style={{ background: "radial-gradient(120px_60px_at_20%_20%,rgba(139,92,246,.35),transparent)"}} />
              </div>

              <div className="group relative">
                <input
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="peer w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white placeholder-white/50 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40"
                />
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition group-hover:opacity-40 group-hover:blur-3xl group-focus-within:opacity-60" style={{ background: "radial-gradient(120px_60px_at_80%_30%,rgba(139,92,246,.35),transparent)"}} />
              </div>

              <div className="group relative">
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="peer w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white placeholder-white/50 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40"
                />
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition group-hover:opacity-40 group-hover:blur-3xl group-focus-within:opacity-60" style={{ background: "radial-gradient(120px_60px_at_70%_70%,rgba(139,92,246,.35),transparent)"}} />
              </div>

              <div className="group relative">
                <input
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="peer w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white placeholder-white/50 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/40"
                />
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition group-hover:opacity-40 group-hover:blur-3xl group-focus-within:opacity-60" style={{ background: "radial-gradient(120px_60px_at_30%_90%,rgba(139,92,246,.35),transparent)"}} />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-rose-300/90"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-violet-700 p-[2px]"
              >
                <span className="absolute inset-0 animate-pulse bg-[radial-gradient(120px_60px_at_var(--x,50%)_0%,rgba(255,255,255,0.08),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative block w-full rounded-[10px] bg-[#0f0b17]/90 px-4 py-3 text-center font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur">
                  Sign Up
                </span>
              </motion.button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-5 text-center text-sm text-white/70"
            >
              Already have an account?{" "}
              <Link className="font-medium text-violet-300 underline-offset-4 hover:underline" to="/login">
                Login
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40 shadow-[0_0_20px_2px_rgba(168,85,247,0.35)]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -30 - (i % 5) * 10, 0],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SignUp;


