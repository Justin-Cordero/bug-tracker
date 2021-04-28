import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { postToServer } from "../../helperFunctions.js";

const AddProjectPage = () => {
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    postToServer("projects", {
      name: e.target.title.value,
      developer: [],
      tickets: [],
    });
    history.push("/");
  };
  return (
    <div className="center">
      <Navbar />
      <h1 className="page-title">Create New Project</h1>
      <form className="form-control" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required />
        <br />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default AddProjectPage;
