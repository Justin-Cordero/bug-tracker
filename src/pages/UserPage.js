import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Navbar from "../components/Navbar/Navbar";
import {
  fetchDetail,
  fetchGitHub,
  patchToServer,
  deleteFromServer,
} from "../helperFunctions.js";

const UserPage = () => {
  const currentUser = useContext(UserContext);
  let history = useHistory();
  const [person, setPerson] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    fetchDetail("users", userId).then((data) => setPerson(data));
  }, []);

  useEffect(() => {
    if (person && person.github_username) {
      fetchGitHub(person.github_username).then((data) => {
        setGithubData(data);
      });
    }
  }, [person]);

  const handleUpgrade = () => {
    // Changes a regular user to admin/superuser
    patchToServer("users", userId, { is_superuser: true }).then(
      history.push("/")
    );
  };

  const handleDelete = () => {
    // Deletes a User from database
    deleteFromServer("users", userId).then(history.push("/"));
  };

  if (!person) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="center profile-page">
        <h1 className="page-title">
          {person.first_name} {person.last_name}
        </h1>

        {githubData ? (
          <>
            <img
              src={githubData.avatar_url}
              alt="user"
              height="250"
              width="250"
            />
            <p>
              GitHub: <a href={githubData.html_url}>{githubData.login}</a>
            </p>
            <p>Location: {githubData.location}</p>
          </>
        ) : (
          <i className="fas fa-user-secret"></i>
        )}
        <br />
        <br />
        {person.email ? <p>Email: {person.email}</p> : null}
        {person.is_superuser ? <p>Role: Admin</p> : <p>Role: Developer</p>}
        <p>Number of Projects assigned: {person.projects.length}</p>
        <p>Number of Tickets Issued: {person.tickets.length}</p>
        <p>Date Joined: {person.date_joined}</p>
        <br />
        {/* Only admins can edit/delete non-admin users */}
        {currentUser.is_superuser && !person.is_superuser && (
          <div className="danger-box">
            <h2>*Warning*</h2>
            <p>
              These actions have serious consequences. Confirm your actions
              before proceeding
            </p>
            <br />
            <button
              type="button"
              className="edit-button"
              onClick={handleUpgrade}
            >
              Upgrade to Admin
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete User
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
