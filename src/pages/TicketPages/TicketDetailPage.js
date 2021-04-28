import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserContext from "../../contexts/UserContext";
import {
  fetchDetail,
  fetchAll,
  postToServer,
  deleteFromServer,
} from "../../helperFunctions.js";

const TicketPage = () => {
  let user = useContext(UserContext);
  let history = useHistory();
  let { projectId, ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);

  // When page renders, the specific ticket is fetched from the database
  useEffect(() => {
    fetchDetail("tickets", parseInt(ticketId)).then((data) => {
      setTicket(data);
    });
  }, []);

  // Fetch the author from database using ticket.author property
  useEffect(() => {
    if (ticket) {
      fetchDetail("users", parseInt(ticket.author)).then((data) => {
        setAuthor(data);
      });
    }
  }, [ticket]);

  // Fetch the all ticket comments from database then filter the ones related to this ticket
  useEffect(() => {
    if (ticket && ticket.comments.length > 0) {
      fetchAll("ticket-comments").then((allComments) => {
        let relatedComments = [];
        for (let i = 0; i < allComments.length; i++) {
          for (let j = 0; j < ticket.comments.length; j++) {
            if (allComments[i].id === ticket.comments[j]) {
              relatedComments.push(allComments[i]);
            }
          }
        }
        setComments(relatedComments);
      });
    }
  }, [ticket]);

  const handleNewComment = (e) => {
    e.preventDefault();
    postToServer("ticket-comments", {
      comment: e.target.newComment.value,
      author: user.id,
      ticket: parseInt(ticketId),
    });
    history.push(`/projects/${projectId}`);
  };

  const deleteTicket = () => {
    deleteFromServer("tickets", parseInt(ticketId)).then(() =>
      history.push("/")
    );
  };

  const deleteComment = (id) => {
    deleteFromServer("ticket-comments", id).then(history.push("/"));
  };

  if (!author) {
    return <h1 className="center">Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="center project-detail">
        <h1 className="page-title">Ticket #{ticket.id}</h1>
        <p>
          Priority: {ticket.priority}
          <br />
          Type: {ticket.type}
          <br />
          Status: {ticket.status}
          <br />
          Description: {ticket.description}
          <br />
          Issued: {ticket.created_at} by: {author.first_name} {author.last_name}
        </p>
        {user.is_superuser ? (
          <>
            <Link
              to={`/projects/${projectId}/tickets/${ticketId}/edit`}
              className="edit-button"
            >
              Edit Ticket
            </Link>
            <button
              type="button"
              onClick={deleteTicket}
              className="delete-button"
            >
              Delete Ticket
            </button>
          </>
        ) : (
          <br />
        )}
        <h2>Comments:</h2>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <>
                  <li key={comment.id}>
                    {comment.comment} &nbsp;
                    {user.is_superuser || user.id === comment.author ? (
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteComment(comment.id)}
                      >
                        DELETE
                      </button>
                    ) : null}
                  </li>
                  <hr />
                </>
              );
            })
          ) : (
            <p>No comments</p>
          )}
        </ul>
        <form
          className="form-control"
          style={{ margin: "2rem auto", width: "28%", padding: "1.2rem 0 0 0" }}
          onSubmit={handleNewComment}
        >
          <input
            type="text"
            name="newComment"
            maxLength="255"
            placeholder="Add New Comment (Leave Your Name)"
          />
          <button type="submit" style={{ background: "#73d1b2", width: "25%" }}>
            ADD
          </button>
        </form>
        <Link to={`/projects/${projectId}`} className="back-button">
          Back to Project
        </Link>
      </div>
    </>
  );
};

export default TicketPage;
