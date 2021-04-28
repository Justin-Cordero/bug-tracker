import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { fetchAll } from "../../helperFunctions.js";

const AllTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetchAll("tickets").then((data) => setTickets(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <h1 className="page-title">All Tickets</h1>
        <div>
          <ul className="list-container">
            {tickets.map((ticket) => {
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
        </div>
      </div>
    </>
  );
};

export default AllTicketsPage;
