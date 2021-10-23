import React, { useState } from "react";

// Router
import { useHistory, useLocation } from "react-router-dom";

// Styles
import "../assets/styles.css";

// Components
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function UpdateTask() {
  const location = useLocation();
  const history = useHistory();

  const { task } = location.state;

  const [name, setName] = useState(task.name);
  const [loading, setLoading] = useState(false);

  const submitTask = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API_URL}/task/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, completed: task.completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <form className="task-form" onSubmit={submitTask}>
          <h2>Update Task</h2>
          <label>Name:</label>
          <input
            style={{ padding: 8 }}
            required
            type="text"
            placeholder="Type a name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            style={{
              marginTop: 25,
              padding: 10,
              background: "#27ae60",
              border: 0,
              borderRadius: 6,
              color: "whitesmoke",
            }}
          >
            <strong>Submit</strong>
          </button>
        </form>
      </div>
    </>
  );
}
