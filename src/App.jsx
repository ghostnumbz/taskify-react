import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // useState hook to manage state
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  // useEffect hook to load tasks from local storage
  useEffect(() => {
    const saved = localStorage.getItem("todo-tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing tasks from local storage:", error);
        setTasks([]);
      }
    }
  }, []);

  // useEffect hook to save tasks to local storage
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task function
  const addTask = () => {
    if (taskInput.trim() === "") return; // Prevent empty task

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput(""); // Clear input after adding task
  };

  // Toggle task completion function
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Delete task function
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks function
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "ongoing") {
      return !task.completed;
    }
    return true;
  });

  // JSX structure

  return (
    <div className="container">
      {/* Main heading */}
      <h1>📝 Todo List</h1>

      {/* Input field and Add button group */}
      <div className="input-group">
        {/* Input for typing task */}
        <input
          type="text"
          value={taskInput} // Controlled input tied to taskInput state
          onChange={(e) => setTaskInput(e.target.value)} // Update taskInput state on typing
          placeholder="Add a new task"
        />
        {/* Button to add the new task */}
        <button onClick={addTask}>Add</button>
      </div>

      {/* Filter buttons to filter the task list */}
      <div className="filters">
        {/* Button to show all tasks */}
        <button
          className={filter === "all" ? "active" : ""} // Apply 'active' class if filter is selected
          onClick={() => setFilter("all")}
        >
          All
        </button>

        {/* Button to show only completed tasks */}
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        {/* Button to show only ongoing (not completed) tasks */}
        <button
          className={filter === "ongoing" ? "active" : ""}
          onClick={() => setFilter("ongoing")}
        >
          Ongoing
        </button>
      </div>

      {/* Render the task list */}
      <ul className="task-list">
        {/* Loop through the filtered tasks and display each task */}
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {" "}
            {/* Each task needs a unique key */}
            {/* Task text - clicking it toggles completion */}
            <span
              onClick={() => toggleTask(task.id)} // Toggle complete/incomplete state
              className={task.completed ? "completed" : ""} // Apply CSS class if task is completed
            >
              {task.text}
            </span>
            {/* Button to delete the task */}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
