import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StoryForm.css";

const StoryForm = ({ storyToEdit }) => {
  const [title, setTitle] = useState(storyToEdit?.title || "");
  const [content, setContent] = useState(storyToEdit?.content || "");
  const [department, setDepartment] = useState(storyToEdit?.department || "");
  const navigate = useNavigate();

  const departmentOptions = ["IT", "CLIMATE", "ARCHITECTURE", "OTHER"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStory = { title, content, department };

    try {
      const response = storyToEdit
        ? await fetch(`${import.meta.env.VITE_BACKEND_URL}/stories/${storyToEdit.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStory),
          })
        : await fetch(`${import.meta.env.VITE_BACKEND_URL}/stories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStory),
          });

      if (response.ok) {
        alert(storyToEdit ? "Story updated successfully!" : "Story added successfully!");
        navigate("/");
      } else {
        alert("Failed to save story");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving story");
    }
  };

  return (
    <div className="story-form-container">
      <h2 className="form-title">{storyToEdit ? "Edit Story" : "Add New Story"}</h2>
      <form onSubmit={handleSubmit} className="story-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the story title"
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the story content"
            required
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          {storyToEdit ? "Update Story" : "Add Story"}
        </button>
      </form>
      <button onClick={() => navigate("/")} className="back-button">
        Back to Story List
      </button>
    </div>
  );
};

export default StoryForm;