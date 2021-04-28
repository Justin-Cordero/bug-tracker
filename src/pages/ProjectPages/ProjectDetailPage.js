// Will have all info on project and all tickets attached to the project
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Navbar from "../../components/Navbar/Navbar";
import {
  fetchDetail,
  fetchAll,
  deleteFromServer,
} from "../../helperFunctions.js";

const ProjectDetailPage = () => {
  let user = useContext(UserContext);
  let history = useHistory();
  let { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [devs, setDevs] = useState([]);

  // When page renders, the specific project is fetched from the database
  useEffect(() => {
    fetchDetail("projects", parseInt(projectId)).then((data) => {
      setProject(data);
    });
  }, []);

  // All tickets are fetched, if any match this project they get set in 'tickets' state
  useEffect(() => {
    if (project && project.tickets.length > 0) {
      fetchAll("tickets").then((allTickets) => {
        let relatedTickets = [];
        for (let i = 0; i < allTickets.length; i++) {
          for (let j = 0; j < project.tickets.length; j++) {
            if (allTickets[i].id === project.tickets[j]) {
              relatedTickets.push(allTickets[i]);
            }
          }
        }
        setTickets(relatedTickets);
      });
    }
  }, [project]);

  // All Users are fetched, if any match this project they get set in 'devs' state
  useEffect(() => {
    if (project && project.developer.length > 0) {
      fetchAll("users").then((allUsers) => {
        let developers = [];
        for (let i = 0; i < allUsers.length; i++) {
          for (let j = 0; j < project.developer.length; j++) {
            if (allUsers[i].id === project.developer[j]) {
              developers.push(allUsers[i]);
            }
          }
        }
        setDevs(developers);
      });
    }
  }, [project]);

  const handleDelete = () => {
    deleteFromServer("projects", parseInt(projectId)).then(() =>
      history.push("/")
    );
  };

  if (!project) {
    return <h1 className="center">Loading...</h1>;
  }

  return (
    <div className="page-wrapper project-detail">
      <Navbar />
      <div>
        <h1 className="page-title">{project.name}</h1>
        <p>
          Number of tickets: {project ? project.tickets.length : "0"}
          <br />
          Number of developers assigned:{" "}
          {project ? project.developer.length : "0"}
        </p>
        {user.is_superuser ? (
          <>
            <Link to={`/projects/${projectId}/edit`} className="edit-button">
              Edit Project
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
            >
              DELETE Project
            </button>
          </>
        ) : (
          <br />
        )}
      </div>
      <div>
        <h2>Tickets: </h2>
        <ul className="list-container">
          {tickets.map((ticket) => {
            return (
              <>
                <li key={ticket.id}>
                  <Link to={`/projects/${projectId}/tickets/${ticket.id}`}>
                    <p>
                      ID: {ticket.id} | Status: {ticket.status} | Type:{" "}
                      {ticket.type} | Priority: {ticket.priority}
                    </p>
                  </Link>
                </li>
                <hr />
              </>
            );
          })}
        </ul>
        <br />
        <Link to={`/projects/${projectId}/new-ticket`} className="add-button">
          Add Ticket
        </Link>
      </div>
      <div>
        <h2>Developers: </h2>
        <ul>
          {devs.map((dev) => {
            return (
              <>
                <li key={dev.id}>
                  <Link to={`/users/${dev.id}`}>
                    {dev.first_name} {dev.last_name}
                  </Link>
                </li>
                <hr />
              </>
            );
          })}
        </ul>
        <br />
        <Link to="/projects" className="back-button">
          Back to All Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
