import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin, setLoggedStreamer }) => {
  const [streamer, setStreamer] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setStreamer({ ...streamer, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(streamer) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(streamer),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();
      console.log(data.streamer.username);
      setLoggedStreamer(data.streamer.username)
      if (!res.ok) {
        alert("Login failed");
        setStreamer({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("Streamism Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!streamer.username || !streamer.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(streamer);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const streamer = { username: "demo", password: "password" };
    postFetch(streamer);
  }

  return (
    // <div style={{ textAlign: "center" }}>
    <div className="login-container">
      <button onClick={handleDemoSignIn}>Demo User</button>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">
            <input
              id="username"
              value={streamer.username}
              type="text"
              placeholder="username"
              autoComplete="username"
              onChange={handleChange}
            />
          </label>
        </section>
        <section>
          <label htmlFor="password">
            <input
              id="password"
              value={streamer.password}
              type="password"
              placeholder="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </label>
        </section>
        <section className="button-section">
          <button>Submit</button>
          <Link to={"/platforms"}>
            <button>Back</button>
          </Link>
        </section>
      </form>
      <p>
        No Account? <Link to="/register">Register</Link>
      </p>
    </div>
    // </div>
  );
};

export default Login;
