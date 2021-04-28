import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Navbar from "../../components/Navbar/Navbar";
import { fetchAll } from "../../helperFunctions.js";

const MyProjectsPage = () => {
  const user = useContext(UserContext);
  const [allProjects, setAllProjects] = useState(null);
  const [myProjects, setMyProjects] = useState(null);

  useEffect(() => {
    fetchAll("projects").then((data) => setAllProjects(data));
  }, []);

  useEffect(() => {
    if (
      allProjects &&
      user &&
      Object.keys(user).length !== 0 &&
      user.constructor === Object
    ) {
      let relatedProjects = [];
      for (let i = 0; i < allProjects.length; i++) {
        for (let j = 0; j < user.projects.length; j++) {
          if (allProjects[i].id === user.projects[j]) {
            relatedProjects.push(allProjects[i]);
          }
        }
      }
      setMyProjects(relatedProjects);
    }
  }, [allProjects]);

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

  if (!myProjects) {
    return (
      <>
        <Navbar />
        <h1 className="page-title">My Projects</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="center">
        <h1 className="page-title shift-title">My Projects</h1>
        {myProjects.length > 0 ? (
          <ul className="list-container shift">
            {myProjects.map((project) => {
              return (
                <>
                  <li key={project.id}>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                  </li>
                  <hr />
                </>
              );
            })}
          </ul>
        ) : (
          <p className="shift" style={{ left: "44%" }}>
            You have no projects assigned
          </p>
        )}
      </div>
    </>
  );
};

export default MyProjectsPage;
