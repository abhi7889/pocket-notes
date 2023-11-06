import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import images from "../../assets/images";
import "./Notespage.css";

export default function NotesPage() {
  const [note, setNote] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState([]);

  const groupNames = JSON.parse(localStorage.getItem("groupNames"));
  const firstWord = groupNames[0].name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  // console.log("groupNames", groupNames);
  const location = useLocation();
  const selectedTitle = location.state ? location.state.selectedTitle : null;
  useEffect(() => {
    if (selectedTitle) {
      const groupNames = JSON.parse(localStorage.getItem("groupNames"));
      const selectedGroup = groupNames.find(
        (group) => group.name === selectedTitle
      );
      setSelectedGroup(selectedGroup);
      const savedNotes = JSON.parse(localStorage.getItem(selectedTitle)) || [];
      setNotes(savedNotes);
    }
  }, [selectedTitle]);

  // console.log("selectedGroup", selectedGroup);
  // console.log("notespage", selectedTitle);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    if (note.trim() !== "") {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const dateTime = `${time} ${date}`;
      const newNote = {
        text: note,
        dateTime: dateTime,
      };
      const newNotes = [newNote, ...notes];
      setNotes(newNotes);
      localStorage.setItem(selectedTitle, JSON.stringify(newNotes));
      setNote("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleNoteSubmit(event);
    }
  };
  return (
    <div>
      {selectedGroup ? (
        <div className="notes--content">
          <div className="header">
            {selectedGroup && (
              <>
                <div
                  style={{ backgroundColor: selectedGroup.color }}
                  className="profile--logo"
                >
                  {firstWord}
                </div>
                <div className="profile--name">{selectedGroup.name}</div>
              </>
            )}
          </div>
          <div className="notes-message">
            {notes.map((note, index) => (
              <div key={index} className="message--time">
                <div className="date--time">{note.dateTime}</div>
                <div className="text--message">{note.text}</div>
              </div>
            ))}
          </div>
          <div className="text-area--bottom">
            <form  onSubmit={handleNoteSubmit}>
              <div style={{ position: "relative" }}>
                <textarea
                  placeholder="Enter your text here..........."
                  value={note}
                  onChange={handleNoteChange}
                  onKeyPress={handleKeyPress}
                  cols="30"
                  rows="10"
                ></textarea>
                <button
                  className="enter--icon"
                  type="button"
                  onClick={handleNoteSubmit}
                  style={{
                    position: "absolute",
                    right: "20px",
                    bottom: "20px",
                  }}
                >
                  <img src={images.enter} alt="enter" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="default--page">
          <div>
            <img
              style={{ width: "500", height: "250px" }}
              src={images.DefaultImage}
              alt="random"
            />
          </div>
          <div className="default--text">
            <h3>Pocket Notes</h3>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          <div className="lock--div">
            <img src={images.lock} alt="lock" />
            <span>end-to-end encrypted</span>
          </div>
        </div>
      )}
    </div>
  );
}
