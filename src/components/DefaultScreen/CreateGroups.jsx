import React, { useState, useEffect } from "react";
import "./CreateGroup.css";
import Popup from "../SideBarNotesTiles/PopUp";
import NotesTitle from "../SideBarNotesTiles/NotesTitle";

export default function CreateGroups() {
  const [titles, setTitles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [groupNamesParent, setGroupNamesParent] = useState([]);
  
  useEffect(() => {
    const data = localStorage.getItem("groupNames");
    if (data) {
      const groupNames = JSON.parse(data);
      setGroupNamesParent(groupNames);
      const titles = Object.keys(groupNames).map((key) => [groupNames[key]]);
      setTitles(titles);
    }
  }, []);

  useEffect(() => {
    if (groupNamesParent.length > 0) {
      const obj = JSON.parse(localStorage.getItem("groupNames"));
      const result = Object.keys(obj).map((key) => [obj[key]]);
      setTitles(result);
    }
  }, [groupNamesParent]);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="sidebar--create--button">
        <h2>Pocket Notes</h2>
        <div className="button--text--sidebar">
          <button className="create--group" onClick={handleClick}>
            <span className="add">+</span>
            <span className="add2">Create Notes Group</span>
          </button>
        </div>
      </div>

      <div className="sidebar--tiles">
        {titles.length > 0 ? (
          titles.map((title, index) => (
            <NotesTitle
              key={index}
              title={title}
              selectedTitle={selectedTitle}
              setSelectedTitle={setSelectedTitle}
            />
          ))
        ) : (
          <div className=""></div>
        )}
      </div>
      {showPopup && (
        <div className="popup--window">
          <Popup
            groupNamesParent={groupNamesParent}
            setGroupNamesParent={setGroupNamesParent}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}
