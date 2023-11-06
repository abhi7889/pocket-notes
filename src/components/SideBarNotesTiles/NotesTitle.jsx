import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotesTiles.css";

export default function NotesTitle({ title, selectedTitle, setSelectedTitle }) {
  const navigate = useNavigate();

  const nameFirst = title[0].name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const newTitle = title[0].name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    const handleTitleClick = () => {
      setSelectedTitle(title[0].name);
      navigate(`/NotesPage`, { state: { selectedTitle: title[0].name } });
    };
// console.log(setSelectedTitle);
  return (
    <div
      onClick={handleTitleClick}
      className={`initial--logo ${selectedTitle === title[0].name ? "highlighted__title" : ""}`}
    >
      <div
        className="initial--title--circle"
        style={{ backgroundColor: title[0].color }}
      >
        {nameFirst}
      </div>
      <div className="group__title">{newTitle}</div>
    </div>
  );
}