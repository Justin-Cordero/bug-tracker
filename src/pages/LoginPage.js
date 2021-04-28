import React from "react";
import { Link, useHistory } from "react-router-dom";

const customStyles = {
  main: {
    backgroundColor: "#fff",
    textAlign: "center",
    width: "40%",
    height: "auto",
    margin: "7em auto",
    borderRadius: "1.5rem",
    boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
    paddingBottom: "1.5rem",
    fontFamily: "'Teko', sans-serif",
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
    border: "1px solid #71c9ce",
    padding: ".3rem 3rem",
    fontSize: "1.5rem",
    boxShadow: "0 0 20px 1px rgba(0, 0, 0, 0.04)",
    marginBottom: "2rem",
    width: "45%",
  },
  register: {
    fontSize: "1.5rem",
    textShadow: "0px 0px 3px rgba(117, 117, 117, 0.12)",
    color: "#a6e3e9",
  },
  demo: {
    display: "flex",
    justifyContent: "space-around",
  },
  demoBtn: {
    boxShadow: "inset 0px 0px 7px 0px #dcecfb",
    background: "linear-gradient(to right, #71c9ce, #e3fdfd)",
    backgroundColor: "#bddbfa",
    borderRadius: "13px",
    border: "1px solid #71c9ce",
    display: "inline-block",
    cursor: "pointer",
    color: "#fff",
    padding: "1.5rem .8rem",
    margin: "1rem",
    textDecoration: "none",
    textShadow: "1px 2px 2px #45526c",
    width: "40%",
  },
  demoText: {
    fontSize: "2rem",
  },
};

const LoginPage = (props) => {
  const { handleLogin, handleLogout, isLoggedIn, demoLogin } = props;
  let history = useHistory();

  function redirectDemo(e, who) {
    if (who === "demoAdmin") {
      demoLogin(e, true);
    } else if (who === "demoUser") {
      demoLogin(e);
    }
    history.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(e);
    history.push("/");
  };

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <form style={customStyles.main} onSubmit={handleSubmit}>
      <p style={customStyles.sign}>Sign in</p>
      <input
        style={customStyles.input}
        type="text"
        name="username"
        placeholder="Username"
      />
      <input
        style={customStyles.input}
        type="password"
        name="password"
        placeholder="Password"
      />
      <br />
      <button type="submit" style={customStyles.btn}>
        Sign in
      </button>
      <br />
      <Link to="/register" style={customStyles.register}>
        Create Account
      </Link>
      <br />
      <div className="demo">
        <button
          onClick={(e) => redirectDemo(e, "demoAdmin")}
          style={customStyles.demoBtn}
          type="button"
        >
          <span style={customStyles.demoText}>Demo Admin</span>
          <br />
          <i style={{ fontSize: "3rem" }} className="fas fa-user-plus"></i>
        </button>
        <button
          onClick={(e) => redirectDemo(e, "demoUser")}
          style={customStyles.demoBtn}
          type="button"
        >
          <span style={customStyles.demoText}>Demo User</span>
          <br />
          <i style={{ fontSize: "3rem" }} className="fas fa-user"></i>
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
