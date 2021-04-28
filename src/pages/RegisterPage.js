import React from "react";
import { Link, useHistory } from "react-router-dom";
import { signupUser } from "../helperFunctions.js";

const RegisterPage = () => {
  const history = useHistory();
  const customStyles = {
    main: {
      backgroundColor: "#fff",
      textAlign: "center",
      width: "50%",
      height: "auto",
      margin: "7em auto",
      borderRadius: "1.5rem",
      boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
      paddingBottom: "1.5rem",
    },
    sign: {
      paddingTop: "40px",
      color: "#71c9ce",
      fontWeight: "bold",
      fontSize: "2rem",
      marginBottom: "1.7rem",
    },
    input: {
      width: "76%",
      color: "#000",
      fontWeight: "400",
      fontSize: "1.2rem",
      letterSpacing: "1px",
      background: "rgba(136, 126, 126, 0.04)",
      padding: "10px 20px",
      borderRadius: "20px",
      outline: "none",
      boxSizing: "border-box",
      border: "2px solid rgba(0, 0, 0, 0.02)",
      textAlign: "center",
      marginBottom: "1.6rem",
    },
    btn: {
      cursor: "pointer",
      borderRadius: "5em",
      color: "#fff",
      background: "linear-gradient(to right, #71c9ce, #e3fdfd)",
      border: "0",
      padding: "10px 40px",
      fontSize: "1.5rem",
      boxShadow: "0 0 20px 1px rgba(0, 0, 0, 0.04)",
      marginBottom: "2rem",
    },
    login: {
      textShadow: "0px 0px 3px rgba(117, 117, 117, 0.12)",
      color: "#a6e3e9",
    },
  };

  const handleSubmit = async (e) => {
    // post to server with new user data object made from form data
    e.preventDefault();
    const newUser = {
      is_superuser: false,
      username: e.target.username.value,
      password: e.target.password.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      is_staff: true,
      github_username: e.target.github_username.value,
    };
    let response = await signupUser(newUser);
    let data = await response.json();
    if (data.error) {
      console.log("There was an error signing up");
    } else {
      history.push("/login"); // Redirects to Login Page if successful
    }
  };

  return (
    <form style={customStyles.main} onSubmit={handleSubmit}>
      <p style={customStyles.sign}>Register</p>
      <input
        style={customStyles.input}
        type="text"
        name="first_name"
        placeholder="First Name*"
        required
      />
      <input
        style={customStyles.input}
        type="text"
        name="last_name"
        placeholder="Last Name*"
        required
      />
      <input
        style={customStyles.input}
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        style={customStyles.input}
        type="text"
        name="username"
        placeholder="Username*"
        required
      />
      <input
        style={customStyles.input}
        type="password"
        name="password"
        placeholder="Password*"
        required
      />
      <input
        style={customStyles.input}
        type="text"
        name="github_username"
        placeholder="GitHub Username"
      />
      <br />
      <button type="submit" style={customStyles.btn}>
        Create Account
      </button>
      <br />
      <Link to="/login" style={customStyles.login}>
        Already have an account? Login
      </Link>
    </form>
  );
};

export default RegisterPage;
