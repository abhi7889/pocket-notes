import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./SideBar";
import NotesScreen from "./NotesScreen";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="main--screen">
        <div className="sidebar--screen">
          <SideBar />
        </div>
        <div className="notes-screen">
          <NotesScreen />
        </div>
      </div>
    </Router>
  );
}
