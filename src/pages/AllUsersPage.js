import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import { fetchAll } from "../helperFunctions.js";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    fetchAll("users").then((data) => setAllUsers(data));
  }, []);

  if (!allUsers) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="center">
        <h1 className="page-title shift-title">All Users</h1>
        <ul className="list-container shift">
          {allUsers.map((user) => {
            return (
              <>
                <li key={user.id}>
                  <Link to={`/users/${user.id}`} key={user.id}>
                    ID: {user.id} | {user.first_name} {user.last_name} | Role:{" "}
                    {user.is_superuser ? "Admin" : "Developer"}
                  </Link>
                </li>
                <hr />
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default AllUsers;
