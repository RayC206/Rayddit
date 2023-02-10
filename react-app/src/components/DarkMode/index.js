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

        .postContainer {
          background-color : ${darkMode ? 'rgb(62, 60, 60)' : 'white'}
        }

        .postContainer > div {
          color: ${darkMode ? 'white' : 'black'}
        }
        .outerPostContainer {
          background-color: ${darkMode ? 'rgb(94, 94, 118)' : 'rgb(247, 247, 252)'};
          border: ${darkMode ? '1px solid rgb(38 35 35)' : '1px solid rgb(206, 195, 195)'}
        }
        .homepageSubredditContent, .subredditCreateDiv, .iconContainer {
          background-color: ${darkMode ? 'rgb(62, 60, 60)': 'white'};
          color: ${darkMode ? 'white' : 'black'}
        }

        .homePageSubredditInfo, .developerInfoDiv{
          border: ${darkMode ? '1px solid rgb(38 35 35)' : '1px solid rgb(206, 195, 195)'}
        }
        .aboutSubreddit, .developerInfoContent, .createSubredditButton{
          background-color: ${darkMode ? 'rgb(98 122 146)' : 'rgb(0,121,211)' }
        }


      `}</style>
    </div>
  );
};

export default DarkModeButton;
