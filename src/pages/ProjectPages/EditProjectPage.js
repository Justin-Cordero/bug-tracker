import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import MultiSelect from "react-multi-select-component";
import Navbar from "../../components/Navbar/Navbar";
import { putToServer, fetchDetail, fetchAll } from "../../helperFunctions.js";

const EditProjectPage = () => {
  let history = useHistory();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [devs, setDevs] = useState(null);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchDetail("projects", projectId).then((data) => setProject(data));
  }, []);

  useEffect(() => {
    if (project) {
      setDevs(project.developer);
    }
  }, [project]);

  useEffect(() => {
    if (devs) {
      fetchAll("users").then((data) => {
        setAllUsers(data);
      });
    }
  }, [devs]);

  // Established styled option list for devs assigned to project using MultiSelect npm package
  useEffect(() => {
    if (allUsers) {
      let devOptions = [];
      for (let i = 0; i < allUsers.length; i++) {
        devOptions.push({
          label: `${allUsers[i].first_name} ${allUsers[i].last_name}`,
          value: allUsers[i].id,
        });
      }
      setOptions(devOptions);
    }
  }, [allUsers]);

  // sets the array of selected developers in state anytime there is a change
  useEffect(() => {
    if (selected) {
      let newAssignedDevs = [];
      for (let i = 0; i < selected.length; i++) {
        newAssignedDevs.push(selected[i].value);
      }
      setDevs(newAssignedDevs);
    }
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProject = {
      name: e.target.name.value,
      developer: devs,
      tickets: project.tickets,
    };
    putToServer("projects", projectId, updatedProject);
    history.push("/");
  };

  if (!allUsers) {
    return <h1 className="center">Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="center">
        <h1 className="page-title">Edit {project.name}</h1>
        <form className="form-control" onSubmit={handleSubmit}>
          <label htmlFor="name">New Title: </label>
          <br />
          <input type="text" name="name" required />
          <br />
          <label>Assigned Developers: </label>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
          <br />
          {selected.length > 0 ? (
            <button type="submit">Update</button>
          ) : (
            <p>Please make your selection</p>
          )}
        </form>
      </div>
    </>
  );
};

export default EditProjectPage;
