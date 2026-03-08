import { useEffect, useState } from "react";
import { TaskMain } from "./TaskMain";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000/api/tasks";

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await axios.post(API, { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };
  const updateTask = async (id, newTitle) => {
  await axios.put(`${API}/${id}`, { title: newTitle });
  fetchTasks();
};
  return (
    <div>
      <TaskMain
          tasks={tasks}
          title={title}
          setTitle={setTitle}
          addTask={addTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
      />
    </div>
  );
}

export default App;