const USERTOKEN = localStorage.getItem("auth-user");

const fetchAll = async (model) => {
  // Accepts a string "model" that represents the data model you want to fetch from the database
  // Models in this project are ["users", "projects", "tickets", "ticket-comments"]
  let requestData = {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
      Authorization: `JWT ${USERTOKEN}`,
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/${model}/`,
    requestData
  );
  const data = await response.json();
  return data; // Returns a promise
};

const fetchDetail = async (model, id) => {
  // Accepts a string "model" that represents the data model you want to fetch from the database + specific id
  // Models in this project are ["users", "projects", "tickets", "ticket-comments"]
  let requestData = {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
      Authorization: `JWT ${USERTOKEN}`,
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/${model}/${id}/`,
    requestData
  );
  const data = await response.json();
  return data; // Returns a promise
};

const postToServer = async (model, dataObj) => {
  // Accepts a string "model" that represents the data model you wish to create and and add to the database
  // Models in this project are ["users", "projects", "tickets", "ticket-comments"]
  // accepts the data object to be added to the database as a second parameter
  try {
    console.log(JSON.stringify(dataObj));
    let requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `JWT ${USERTOKEN}`,
      },
      body: JSON.stringify(dataObj),
    };
    const response = await fetch(
      `http://localhost:8000/api/${model}/`,
      requestData
    );
    const data = await response.json();
    return data; // Returns new database entry
  } catch (err) {
    console.error("There was an issue with the data sent to the server: ", err);
  }
};

const putToServer = async (model, id, dataObj) => {
  // Accepts a string "model" and number id that represents the specific data model you wish to update
  // Models in this project are ["users", "projects", "tickets", "ticket-comments"]
  // accepts the updated data object to be updated in the database as a third parameter
  try {
    let requestData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `JWT ${USERTOKEN}`,
      },
      body: JSON.stringify(dataObj),
    };
    const response = await fetch(
      `http://localhost:8000/api/${model}/${id}/`,
      requestData
    );
    const data = await response.json();
    return data; // Returns new database entry
  } catch (err) {
    console.error("There was an issue with the data sent to the server: ", err);
  }
};

const patchToServer = async (model, id, dataObj) => {
  // Accepts a string "model" and number id that represents the specific data model you wish to update
  // Models in this project are ["users", "projects", "tickets", "ticket-comments"]
  // accepts the updated data object to be updated in the database as a third parameter
  try {
    let requestData = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `JWT ${USERTOKEN}`,
      },
      body: JSON.stringify(dataObj),
    };
    const response = await fetch(
      `http://localhost:8000/api/${model}/${id}/`,
      requestData
    );
    const data = await response.json();
    return data; // Returns new database entry
  } catch (err) {
    console.error("There was an issue with the data sent to the server: ", err);
  }
};

const deleteFromServer = async (model, id) => {
  try {
    let requestData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `JWT ${USERTOKEN}`,
      },
    };
    const response = await fetch(
      `http://localhost:8000/api/${model}/${id}/`,
      requestData
    );
    return "item successfully deleted";
  } catch (error) {
    console.error(
      "There was an issue deleting your data from the server: ",
      error
    );
    return {};
  }
};

const fetchGitHub = async (username) => {
  // Accepts a GitHub username and returns data provided by GitHub Users API
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data; // Returns a promise
};

// User Authentication requests
const login = (userObject) => {
  return fetch("http://localhost:8000/token-auth/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  }).then((res) => res);
};

const getLoggedInUser = (token) => {
  return fetch("http://localhost:8000/api/current_user/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  }).then((res) => res);
};

const signupUser = (userObject) => {
  return fetch("http://localhost:8000/api/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  }).then((res) => res);
};

export {
  fetchAll,
  fetchDetail,
  postToServer,
  putToServer,
  patchToServer,
  deleteFromServer,
  fetchGitHub,
  login,
  getLoggedInUser,
  signupUser,
};
