import React, { useState } from 'react';

const DarkModeButton = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <style jsx>{`
        body, html {
          background-color: ${darkMode ? 'rgb(68,70,84)' : 'rgb(218,224,230)'};
          transition: background-color 0.5s ease;
        }
        #navBarContainer {
          background-color: ${darkMode ? 'rgb(52,53,65)' : 'white'};
          transition: background-color 0.5s ease;
        }
        .profileDropdownDiv {
          background-color: ${darkMode ? 'rgb(98 122 146)' : 'white'}
        }
        .menu_drop > span {
          color: ${darkMode ? 'white' : 'black'}
        }
      `}</style>
    </div>
  );
};

export default DarkModeButton;
