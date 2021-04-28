import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { putToServer, fetchDetail } from "../../helperFunctions.js";

const EditTicketPage = () => {
  let history = useHistory();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchDetail("tickets", ticketId).then((data) => setTicket(data));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // Use dynamic object properties to track/update any form changes
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTicket = {
      priority: ticket.priority,
      type: ticket.type,
      description: ticket.description,
      status: ticket.status,
      author: ticket.author,
      project: ticket.project,
      comments: ticket.comments,
    };
    putToServer("tickets", ticket.id, updatedTicket);
    history.push("/");
  };

  if (!ticket) {
    return <h1 className="center">Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="center">
        <h1 className="page-title">Edit Ticket</h1>
        <form className="form-control" onSubmit={handleSubmit}>
          <label htmlFor="type">Type: </label>
          <select
            name="type"
            id="type"
            value={ticket.type}
            onChange={handleChange}
          >
            <option value="Bug/Error">Bug/Error</option>
            <option value="Typo">Typo</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <label htmlFor="priority">Priority: </label>
          <select
            name="priority"
            id="priority"
            value={ticket.priority}
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <br />
          <label htmlFor="status">Status: </label>
          <select
            name="status"
            id="status"
            value={ticket.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Work">In Work</option>
            <option value="Request More Info">Request More Info</option>
          </select>
          <br />
          <label htmlFor="description">Description: </label>
          <br />
          <textarea
            name="description"
            id="description"
            rows="4"
            cols="55"
            value={ticket.description}
            onChange={handleChange}
          />
          <br />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </>
  );
};

export default EditTicketPage;
