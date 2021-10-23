import React from "react";

// Styles
import "../assets/styles.css";

// Router
import { useHistory } from "react-router-dom";

export default function TaskCard({ task, setLoading, setTask }) {
  const history = useHistory();
  const date = new Date(task.created_at);

  const updateTask = () => {
    history.push({
      pathname: `/update/${task.id}`,
      state: { task: task },
    });
  };

  const markAsCompleteTask = async () => {
    try {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API_URL}/task/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ name: task.name, completed: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getAllTasks();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    try {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API_URL}/task/${task.id}`, {
        method: "DELETE",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getAllTasks();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const { tasks } = await response.json();
      setTask(
        tasks.map((task) => {
          return {
            id: task.id,
            name: task.name,
            completed: task.completed,
            created_at: task.created_at,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div>
        <strong># {task.id}</strong>
        <h3>{task.name}</h3>
      </div>
      <strong style={{ color: task.completed === 0 ? "#eb4d4b" : "#27ae60" }}>
        {task.completed === 0 ? "No completed" : "Completed"}
      </strong>
      <p>
        <strong>Registered</strong>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: -25,
        }}
      >
        <p>{date.toLocaleDateString()}</p>
        <p>{date.toLocaleTimeString()}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {!task.completed && (
          <div>
            <button className="completed-btn" onClick={markAsCompleteTask}>
              Mark as completed
            </button>
          </div>
        )}
        <div>
          <button className="updated-btn" onClick={updateTask}>
            Update
          </button>
          <button className="deleted-btn" onClick={deleteTask}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
