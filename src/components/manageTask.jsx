import { useState } from "react";
import axios from "axios";

function ManageTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post("http://localhost:5000/register", {
        title,
        description
      });
      
      const result = response.data;
      console.warn(result);

      if (result) {
        alert("Data saved successfully");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit" disabled={loading || !title || !description}>
          {loading ? "Saving..." : "Add Task"}
        </button>
      </form>
    </>
  );
}

export default ManageTask;
