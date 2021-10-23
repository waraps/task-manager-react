import React, { useState, useEffect } from "react";

// Components
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

// Styles
import "../assets/styles.css";

// Router
import { Link } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [allTasks, setTask] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTasksByName = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/task/by-name`,
        {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTasksByCompleted = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/task/completed/all`);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="options">
        <Link className="add-btn" to="/new">
          New Task +
        </Link>
        <button className="add-btn" style={{ border: 0 }} onClick={getAllTasks}>
          List All Task
        </button>
        <button className="add-btn" style={{ border: 0 }} onClick={getTasksByCompleted}>
          List task by Completed Status
        </button>
        <form onSubmit={getTasksByName}>
          <label>Find tasks by name</label>
          <br />
          <input
            style={{ padding: 3 }}
            required
            placeholder="type a name task"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button style={{ padding: 3 }}>Find</button>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 15,
        }}
      >
        {allTasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              setLoading={setLoading}
              setTask={setTask}
            />
          );
        })}
      </div>
    </>
  );
}
