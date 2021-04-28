import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Navbar from "../../components/Navbar/Navbar";
import { fetchAll } from "../../helperFunctions.js";

const MyTicketsPage = () => {
  const user = useContext(UserContext);
  const [allTickets, setAllTickets] = useState(null);
  const [myTickets, setMyTickets] = useState(null);

  useEffect(() => {
    fetchAll("tickets").then((data) => setAllTickets(data));
  }, []);

  useEffect(() => {
    if (
      allTickets &&
      user &&
      Object.keys(user).length !== 0 &&
      user.constructor === Object
    ) {
      let relatedTickets = [];
      for (let i = 0; i < allTickets.length; i++) {
        for (let j = 0; j < user.tickets.length; j++) {
          if (allTickets[i].id === user.tickets[j]) {
            relatedTickets.push(allTickets[i]);
          }
        }
      }
      setMyTickets(relatedTickets);
    }
  }, [allTickets]);

  if (
    !user ||
    (Object.keys(user).length === 0 && user.constructor === Object)
  ) {
    return (
      <h1 style={{ fontSize: "4rem" }} className="center">
        You must{" "}
        <Link to="/login" style={{ color: "#000" }}>
          Login
        </Link>
      </h1>
    );
  }

  if (!myTickets) {
    return (
      <>
        <Navbar />
        <div className="center">
          <h1 className="page-title">My Tickets</h1>
          <p style={{ color: "#fff" }}>You have no tickets assigned</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="center">
        <h1 className="page-title shift-title">My Tickets</h1>
        {myTickets.length > 0 ? (
          <ul className="list-container shift">
            {myTickets.map((ticket) => {
              return (
                <>
                  <li key={ticket.id}>
                    <Link
                      to={`/projects/${ticket.project}/tickets/${ticket.id}`}
                    >
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
        ) : (
          <p className="shift" style={{ left: "46%" }}>
            You have no tickets
          </p>
        )}
      </div>
    </>
  );
};

export default MyTicketsPage;
