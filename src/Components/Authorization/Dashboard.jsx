import { useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = ({ handleLogout }) => {
  const { streamer } = useOutletContext(); // Access streamer data provided by the Outlet's context
  const navigate = useNavigate()

  return (
    <div className='register-container'>
      <h2>
        Welcome, {streamer && streamer.username && (
          <>
            {streamer.username[0].toUpperCase()}
            {streamer.username.slice(1).toLowerCase()}
          </>
        )}
      </h2>
      <Link to={'/platforms'}>
        <h3>Click to view Streamism</h3>
      </Link>
      <img src={"?"} alt="streamers-img/gif" />
      {streamer && (
        <div>
          <h2>Dashboard Component</h2>
          <h1>
            Welcome, {streamer.username[0].toUpperCase()}
            {streamer.username.slice(1).toLowerCase()}
          </h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )};
  
export default Dashboard;