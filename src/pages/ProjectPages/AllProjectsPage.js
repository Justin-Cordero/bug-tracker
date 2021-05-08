import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { fetchAll } from "../../helperFunctions.js";

const AllProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAll("projects").then((data) => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <h1 className="page-title">All Projects</h1>
      <div>
        <ul className="list-container">
          {projects.map((project) => {
            return (
              <div key={project.id}>
                <li>
                  <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </li>
                <hr />
              </div>
            );
          })}
        </ul>
      </div>
      <br />
      <Link to="/new-project" className="add-button">
        Add New Project
      </Link>
    </div>
  );
};

export default AllProjectsPage;
