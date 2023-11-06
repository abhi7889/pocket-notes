import React, { useState } from "react";
import "./PopUp.css";

const colorOptions = [
  "rgb(179, 139, 250)",
  "rgb(255, 121, 242)",
  "rgb(67, 230, 252)",
  "rgb(241, 149, 118)",
  "rgb(0, 71, 255)",
  "rgb(102, 145, 255)",
];

export default function Popup({
  groupNamesParent,
  setGroupNamesParent,
  onClose,
}) {
  const [groupName, setGroupName] = useState("");
  const [bgColor, setBgColor] = useState("");


  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleColor = (color) => {
    setBgColor(color);
  };

  const saveName = () => {
    const newGroup = { name: groupName, color: bgColor };
    setGroupNamesParent([...groupNamesParent, newGroup]);
    localStorage.setItem(
      "groupNames",
      JSON.stringify([...groupNamesParent, newGroup])
    );
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup__title">Create New Notes Group</div>
        <div className="popup__input">
          <span>Group Name</span>
          <input
            value={groupName}
            onChange={handleGroupName}
            type="text"
            placeholder="Enter Group Name..."
          />
        </div>
        <div className="popup__color__input">
          <span>Choose colour</span>
          <div className="input__color">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`input__color__${index + 1} ${
                  bgColor === color ? "highlight" : ""
                }`}
                onClick={() => handleColor(color)}
              ></div>
            ))}
          </div>
        </div>
        <div className="popup__close">
          <button onClick={saveName} disabled={groupName.length === 0}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
