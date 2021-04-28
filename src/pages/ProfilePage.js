import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Navbar from "../components/Navbar/Navbar";
import { fetchGitHub, patchToServer } from "../helperFunctions.js";

const ProfilePage = () => {
  const user = useContext(UserContext);
  let history = useHistory();
  const [githubData, setGithubData] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email || "",
    github_username: user.github_username || "",
  });

  useEffect(() => {
    if (user.github_username) {
      fetchGitHub(user.github_username).then((data) => setGithubData(data));
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // Use dynamic object properties to track/update any form changes
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchToServer("users", user.id, profileInfo).then(() => {
      alert(
        "Your information has been successfully updated, changes will be reflected the next time you login"
      );
      history.push("/");
    });
  };

  return (
    <>
      <Navbar />
      <div className="center profile-page">
        <h1 className="page-title">
          {user.first_name} {user.last_name}
        </h1>
        {githubData ? (
          <img
            src={githubData.avatar_url}
            alt="user"
            height="250"
            width="250"
          />
        ) : (
          <i className="fas fa-user-secret"></i>
        )}
        <p>Email: {user.email ? user.email : "Not Provided"}</p>
        {githubData ? (
          <p>
            GitHub: <a href={githubData.html_url}>{user.github_username}</a>
          </p>
        ) : null}
        <p>Role: {user.is_superuser ? "Admin" : "Developer"}</p>
        <p>Last Login: {user.last_login}</p>

        <form
          className="form-control"
          style={{ margin: "3rem auto" }}
          onSubmit={handleSubmit}
        >
          <h3>Edit Profile Info</h3>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={profileInfo.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={profileInfo.last_name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profileInfo.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="github_username"
            placeholder="GitHub Username"
            value={profileInfo.github_username}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
