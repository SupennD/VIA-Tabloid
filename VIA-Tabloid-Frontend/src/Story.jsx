import { useState, useEffect } from "react";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    department: "",
  });
  const [editStory, setEditStory] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stories`);
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const addStory = async () => {
    if (!newStory.title || !newStory.content || !newStory.department) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStory),
      });
      if (response.ok) {
        setNewStory({ title: "", content: "", department: "" });
        fetchStories();
      }
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  const deleteStory = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchStories();
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const updateStory = async (id) => {
    if (!editStory.title || !editStory.content || !editStory.department) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editStory),
      });
      if (response.ok) {
        setEditStory(null);
        fetchStories();
      }
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  const startEditing = (story) => {
    setEditStory(story);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      <h1>Stories</h1>
      <div>
        <h2>Add Story</h2>
        <input
          type="text"
          value={newStory.title}
          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={newStory.content}
          onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
          placeholder="Content"
        />
        <input
          type="text"
          value={newStory.department}
          onChange={(e) => setNewStory({ ...newStory, department: e.target.value })}
          placeholder="Department"
        />
        <button onClick={addStory}>Add Story</button>
      </div>
      {editStory && (
        <div>
          <h2>Edit Story</h2>
          <input
            type="text"
            value={editStory.title}
            onChange={(e) => setEditStory({ ...editStory, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={editStory.content}
            onChange={(e) => setEditStory({ ...editStory, content: e.target.value })}
            placeholder="Content"
          />
          <input
            type="text"
            value={editStory.department}
            onChange={(e) => setEditStory({ ...editStory, department: e.target.value })}
            placeholder="Department"
          />
          <button onClick={() => updateStory(editStory.id)}>Update Story</button>
        </div>
      )}
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <p><strong>{story.department}</strong></p>
            <button onClick={() => deleteStory(story.id)}>Delete</button>
            <button onClick={() => startEditing(story)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Story;