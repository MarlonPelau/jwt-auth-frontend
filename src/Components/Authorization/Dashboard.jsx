import { useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = ({ handleLogout }) => {
  const { streamer } = useOutletContext(); // Access streamer data provided by the Outlet's context
  const navigate = useNavigate()

  return (
    <div className='register-container'>
      <h2>
        Hi {streamer && streamer.username && (
          <>
            {streamer.username[0].toUpperCase()}
            {streamer.username.slice(1).toLowerCase()}
          </>
        )}
      </h2>
      <Link to={'/platforms'}>
        <h3>Click to View Streamism!</h3>
      </Link>
      <img src={"https://res.cloudinary.com/dgifdj6nx/image/upload/v1713190031/Streamism-streamingif_nbnvko.gif"} alt="streamers-gif" />
      {streamer && (
        <div>
          <h2>🕺🏽💃🏽</h2>
          {/* <h1>
            You're the best {streamer.username[0].toUpperCase()}
            {streamer.username.slice(1).toLowerCase()}
          </h1> */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )};
  
export default Dashboard;