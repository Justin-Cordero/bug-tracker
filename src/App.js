import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import LogoutContext from "./contexts/LogoutContext";
// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import UserPage from "./pages/UserPage";
import AllUsersPage from "./pages/AllUsersPage";
import AllProjectsPage from "./pages/ProjectPages/AllProjectsPage";
import MyProjectsPage from "./pages/ProjectPages/MyProjectsPage";
import AddProjectPage from "./pages/ProjectPages/AddProjectPage";
import EditProjectPage from "./pages/ProjectPages/EditProjectPage";
import ProjectDetailPage from "./pages/ProjectPages/ProjectDetailPage";
import AllTicketsPage from "./pages/TicketPages/AllTicketsPage";
import MyTicketsPage from "./pages/TicketPages/MyTicketsPage";
import AddTicketPage from "./pages/TicketPages/AddTicketPage";
import EditTicketPage from "./pages/TicketPages/EditTicketPage";
import TicketDetailPage from "./pages/TicketPages/TicketDetailPage";
// Helper functions
import { getLoggedInUser, login } from "./helperFunctions.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== "null") {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
        }
      }
    };
    if (!user) {
      getUser();
    }
  }, [user]);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    };
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
    } else {
      console.error("There was an issue with your login credentials");
      alert("Invalid Username or Password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  };

  async function demoLogin(evt, admin = false) {
    evt.preventDefault();
    if (admin) {
      const userObject = {
        username: "admin",
        password: "pass123",
      };
      let response = await login(userObject);
      let data = await response.json();
      if (data.token) {
        localStorage.setItem("auth-user", `${data.token}`);
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        console.error("There was an issue with your login credentials");
        alert("Invalid Username or Password. Please try again.");
      }
    } else {
      const userObject = {
        username: "test4",
        password: "password",
      };
      let response = await login(userObject);
      let data = await response.json();
      if (data.token) {
        localStorage.setItem("auth-user", `${data.token}`);
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        console.error("There was an issue with your login credentials");
        alert("Invalid Username or Password. Please try again.");
      }
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/login">
          <LoginPage
            handleLogin={handleLogin}
            demoLogin={demoLogin}
            handleLogout={handleLogout}
          />
        </Route>
        {isLoggedIn ? (
          <UserContext.Provider value={user}>
            <LogoutContext.Provider value={handleLogout}>
              <Route exact path="/">
                <Dashboard
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/my-projects">
                <MyProjectsPage />
              </Route>
              <Route exact path="/projects">
                <AllProjectsPage />
              </Route>
              <Route exact path="/projects/:projectId">
                <ProjectDetailPage />
              </Route>
              <Route path="/projects/:projectId/edit">
                <EditProjectPage />
              </Route>
              <Route path="/new-project">
                <AddProjectPage />
              </Route>
              <Route exact path="/my-tickets">
                <MyTicketsPage />
              </Route>
              <Route exact path="/tickets">
                <AllTicketsPage />
              </Route>
              <Route exact path="/projects/:projectId/tickets/:ticketId">
                <TicketDetailPage />
              </Route>
              <Route path="/projects/:projectId/tickets/:ticketId/edit">
                <EditTicketPage />
              </Route>
              <Route exact path="/projects/:projectId/new-ticket">
                <AddTicketPage />
              </Route>
              <Route exact path="/users">
                <AllUsersPage />
              </Route>
              <Route path="/users/:userId">
                <UserPage />
              </Route>
            </LogoutContext.Provider>
          </UserContext.Provider>
        ) : (
          <h1 style={{ fontSize: "4rem" }} className="center">
            You must{" "}
            <Link to="/login" style={{ color: "#000" }}>
              Login
            </Link>
          </h1>
        )}
      </Switch>
    </Router>
  );
}

export default App;
