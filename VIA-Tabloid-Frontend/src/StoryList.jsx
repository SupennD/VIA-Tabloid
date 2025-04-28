import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StoryList.css";

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stories`);
        if (response.ok) {
          const data = await response.json();
          setStories(data);
        } else {
          console.error("Failed to fetch stories");
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="story-list-container">
      <div className="header">
        <button className="add-button" onClick={() => navigate("/add")}>
          Add New Story
        </button>
      </div>
      <h2 className="title">Story List</h2>
      <ul className="story-list">
        {stories.map((story) => (
          <li
            key={story.id}
            className={`story-item ${selectedStory?.id === story.id ? "selected" : ""}`}
            onClick={() => setSelectedStory(story)}
          >
            <h3 className="story-title">{story.title}</h3>
            <p className="story-content">{story.content}</p>
            <p className="story-department">
              <strong>Department:</strong> {story.department}
            </p>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button
          className="action-button"
          onClick={() => navigate(`/update/${selectedStory?.id}`)}
          disabled={!selectedStory}
        >
          Update Story
        </button>
        <button
          className="action-button"
          onClick={() => {
            if (selectedStory) {
              const confirmDelete = window.confirm(
                `Are you sure you want to delete the story "${selectedStory.title}"?`
              );
              if (confirmDelete) {
                fetch(`${import.meta.env.VITE_BACKEND_URL}/stories/${selectedStory.id}`, {
                  method: "DELETE",
                }).then(() => {
                  setStories(stories.filter((story) => story.id !== selectedStory.id));
                  setSelectedStory(null);
                });
              }
            }
          }}
          disabled={!selectedStory}
        >
          Delete Story
        </button>
      </div>
    </div>
  );
};

export default StoryList;