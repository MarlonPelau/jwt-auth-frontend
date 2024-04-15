import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [streamer, setStreamer] = useState({ username: "", password: "", email: "" });

  function handleChange(event) {
    setStreamer({ ...streamer, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(streamer),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      if (data.token) {
        // in case there is an old token in the browser, remove it
        localStorage.removeItem("token");
        // set the new user's JWT token in the browser
        localStorage.setItem("token", data.token);
        setToggleLogin(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // USE THIS FORM TO BUILD OUT YOUR FORM PROPERLY BY ADDING LABELS AND INPUTS AS WELL AS WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE CODE

  return (
    <div className="register-container">
    <p style={{ fontSize: "20px" }}>
      Already have an account? <Link to="/login">Login</Link>
    </p>
    <h3>Register</h3>
    <form onSubmit={handleSubmit}>
      <section>
        <label htmlFor="username">
          <input
            id="username"
            value={streamer.username}
            type="text"
            placeholder="username"
            onChange={handleChange}
            autoComplete="username"
          />
        </label>
      </section>
      <section>
        <label htmlFor="email">
          <input
            id="email"
            value={streamer.email}
            type="email"
            placeholder="email"
            onChange={handleChange}
            autoComplete="email"
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
      <section className="register-button-section">
        <button>Submit</button>
        <Link to={"/platforms"}>
          <button>Back</button>
        </Link>
      </section>
    </form>
  </div>
);
};

export default Register;

