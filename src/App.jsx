import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/Authorization/ProtectedRoute";
import Register from "./Components/Authorization/Register";
import Login from "./Components/Authorization/Login";
import Dashboard from "./Components/Authorization/Dashboard";
import NavBar from "./Components/Common/NavBar";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/About";
import EditForm from "./Pages/EditForm";
import FourOFour from "./Pages/FourOFour";
import Index from "./Pages/Index";
import NewForm from "./Pages/NewForm";
import Show from "./Pages/Show";

function App() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />
        <Route path="/platforms" element={<Index />} />
        <Route
          exact
          path="/platforms/:platform_id"
          element={<Show reviews={reviews} setReviews={setReviews} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<FourOFour />} />
        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
          <Route
            path="/platforms/:platform_id/new"
            element={<NewForm reviews={reviews} setReviews={setReviews} />}
          />
          <Route
            path="/platforms/:platform_id/edit/:review_id"
            element={<EditForm reviews={reviews} setReviews={setReviews} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
