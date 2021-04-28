import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserContext from "../../contexts/UserContext";
import { postToServer } from "../../helperFunctions.js";

const AddTicketPage = () => {
  let history = useHistory();
  let user = useContext(UserContext);
  let { projectId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      priority: "None",
      type: e.target.type.value,
      description: e.target.description.value,
      status: "Open",
      author: user.id,
      project: parseInt(projectId),
      comments: [],
    };
    postToServer("tickets", newTicket);
    history.push("/");
  };
  return (
    <div className="center">
      <Navbar />
      <h1 className="page-title">Create New Ticket</h1>
      <form className="form-control" onSubmit={handleSubmit}>
        <label htmlFor="type">Type: </label>
        <select name="type" id="type">
          <option value="Bug/Error">Bug/Error</option>
          <option value="Typo">Typo</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <textarea name="description" id="description" rows="4" cols="55" />
        <br />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default AddTicketPage;
