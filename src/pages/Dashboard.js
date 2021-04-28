import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UserContext from "../contexts/UserContext";
import { fetchAll } from "../helperFunctions.js";

const Dashboard = (props) => {
  const { isLoggedIn } = props;
  const user = useContext(UserContext);
  const [allTickets, setAllTickets] = useState(null);
  const [allProjects, setAllProjects] = useState(null);
  const [ticketChartUrl, setTicketChartUrl] = useState("");
  const [projectChartUrl, setProjectChartUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAll("tickets").then((data) => setAllTickets(data));
  }, []);

  useEffect(() => {
    fetchAll("projects").then((data) => setAllProjects(data));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (allTickets) {
      let totalClosed = 0;
      let totalOpen = 0;
      let totalRMI = 0;
      let totalIW = 0;
      for (let i = 0; i < allTickets.length; i++) {
        switch (allTickets[i].status) {
          case "Open":
            totalOpen++;
            break;
          case "Closed":
            totalClosed++;
            break;
          case "Request More Info":
            totalRMI++;
            break;
          case "In Work":
            totalIW++;
            break;
          default:
            break;
        }
      }
      setTicketChartUrl(
        `https://quickchart.io/chart?c={type:'doughnut',data:{labels:['Closed','Request More Info','Open','In Work'],datasets:[{data:[${totalClosed},${totalRMI},${totalOpen},${totalIW}]}]},options:{plugins:{doughnutlabel:{labels:[{text:${allTickets.length},font:{size:20}},{text:'total'}]}}}}`
      );
      setIsLoading(false);
    }
  }, [allTickets]);

  useEffect(() => {
    setIsLoading(true);
    if (allProjects) {
      let projectTitles = [];
      let numberOfDevs = [];
      let numberOfTickets = [];
      for (let i = 0; i < allProjects.length; i++) {
        projectTitles.push(allProjects[i].name);
        numberOfDevs.push(allProjects[i].developer.length);
        numberOfTickets.push(allProjects[i].tickets.length);
      }
      setProjectChartUrl(
        `https://quickchart.io/chart?c={type:'bar',data:{labels:['${projectTitles[0]}','${projectTitles[1]}', '${projectTitles[2]}'], datasets:[{label:'Developers',data:[${numberOfDevs[0]},${numberOfDevs[1]},${numberOfDevs[2]}]},{label:'Tickets',data:[${numberOfTickets[0]},${numberOfTickets[1]},${numberOfTickets[2]}]}]}}`
      );
      setIsLoading(false);
    }
  }, [allProjects]);

  if (!isLoggedIn) {
    return (
      <h1 style={{ fontSize: "4rem" }} className="center">
        You must{" "}
        <Link to="/login" style={{ color: "#000" }}>
          Login
        </Link>
      </h1>
    );
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="card-container">
        <h1 className="page-title">Dashboard</h1>
        <div className="card">
          <Link to="/projects" className="chart-link">
            <h3>View All Projects</h3>
            <img src={projectChartUrl} alt="Project Data Chart" />
          </Link>
        </div>
        <br />
        <div className="card">
          <Link to="/tickets" className="chart-link">
            <h3>View All Tickets</h3>
            <img src={ticketChartUrl} alt="Ticket Data Chart" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
