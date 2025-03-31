import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  function getUserDetails() {
    fetch("https://notesapp-1-56xy.onrender.com/getUserDetails", {
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
      .then((data) => {
        if (data.success === false) {
          navigate("/login");
        } else {
          setUserData(data);
        }
      });
  }

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <nav
      className={`w-full h-20 px-10 flex items-center justify-between shadow-lg transition duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-900"
          : "bg-gradient-to-r from-indigo-500 to-purple-500"
      }`}
    >
      <div
        className="text-3xl font-bold text-white tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        NoteVault
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`px-4 py-2 font-semibold rounded-lg shadow-md transition duration-300 ${
            darkMode
              ? "bg-white text-gray-900 hover:bg-gray-200"
              : "bg-white text-indigo-600 hover:bg-gray-200"
          }`}
          onClick={() => navigate("/addNewNote")}
        >
          Add Note
        </button>

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition duration-300 ${
            darkMode ? "bg-yellow-400" : "bg-gray-800"
          }`}
          title="Toggle Theme"
        >
          {darkMode ? (
            <span className="text-black text-xl">☀️</span>
          ) : (
            <span className="text-white text-xl">🌙</span>
          )}
        </button>

        <Avatar
          onClick={() => navigate("/profile")}
          name={userData ? userData.username : ""}
          size="48"
          round="50%"
          className="cursor-pointer hover:scale-110 transition duration-300"
        />
      </div>
    </nav>
  );
};

export default Navbar;
