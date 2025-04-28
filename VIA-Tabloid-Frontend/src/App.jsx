import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StoryList from "./StoryList";
import StoryForm from "./StoryForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="/add" element={<StoryForm />} />
        <Route path="/update/:id" element={<StoryForm />} />
      </Routes>
    </Router>
  );
}

export default App;

