import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

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

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <nav className="w-full h-20 bg-gradient-to-r from-blue-900 to-blue-700 dark:from-gray-900 dark:to-gray-800 px-10 flex items-center justify-between shadow-lg">
      <div
        className="text-3xl font-bold text-white tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        NoteVault
      </div>

      <div className="flex items-center gap-6">
        <button
          className="px-6 py-2 bg-white text-blue-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          onClick={() => navigate("/addNewNote")}
        >
          Add Note
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-blue-800 dark:bg-gray-700 dark:text-white shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
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
