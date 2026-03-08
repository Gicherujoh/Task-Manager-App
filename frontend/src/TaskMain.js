import React, { useState } from "react";
import "./task.css";

export const TaskMain = ({
  tasks,
  title,
  setTitle,
  addTask,
  deleteTask,
  updateTask
}) => {

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [page, setPage] = useState("all");

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const saveEdit = () => {
    updateTask(editId, editTitle);
    setEditId(null);
  };
   let filteredTasks = tasks;

if (page === "progress") {
  filteredTasks = tasks.filter((task) => task.completed === false);
}

if (page === "completed") {
  filteredTasks = tasks.filter((task) => task.completed === true);
}
console.log(filteredTasks)

  return (
    <div className="dashboard">
         <aside className="sidebar">
       <h2>TaskFlow</h2>
  <p
    className={`menu-item ${page === "all" ? "active" : ""}`}
    onClick={() => setPage("all")}
  >
    All Tasks
  </p>

  <p
    className={`menu-item ${page === "progress" ? "active" : ""}`}
    onClick={() => setPage("progress")}
  >
    In Progress
  </p>

  <p
    className={`menu-item ${page === "completed" ? "active" : ""}`}
    onClick={() => setPage("completed")}
  >
    Completed
  </p>
</aside>

      <main className="main-content">

        <div className="top-bar">
          <h1>Tasks</h1>
          <span>{tasks.length} Total</span>
        </div>

        <div className="task-input-section">
          <input
            placeholder="Create new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask} disabled={!title.trim()}>
            Create
          </button>
        </div>

        <div className="task-grid">

          {tasks.length === 0 ? (
            <div className="empty">
              <h3>No tasks available</h3>
              <p>Create a new task to get started.</p>
            </div>
          ) : (

            tasks.map((task) => (
              <div className="task-card" key={task._id}>

                {editId === task._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <div className="task-actions">
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4>{task.title}</h4>
                      <p>Status: Active</p>
                    </div>

                    <div className="task-actions">
                      <button onClick={() => startEdit(task)}>
                        Update
                      </button>

                      <button onClick={() => deleteTask(task._id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}

              </div>
            ))

          )}

        </div>

      </main>

    </div>
  );
};
