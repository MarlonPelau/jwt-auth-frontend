import { useState, useEffect } from "react";
import Platform from "../Platforms/Platform.jsx";
import "./Platforms.css";
const URL = import.meta.env.VITE_BASE_URL;

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Search bar text input
  function handleTextChange(event) {
    setSearchInput(event.target.value);
  }

  function getSearchResults() {
    return platforms.filter((platform) => {
      const { name, mo } = platform;
      const nameMatch = name.toLowerCase().match(searchInput.toLowerCase());
      const moMatch = mo
        ?.toLowerCase()
        .match(searchInput.toLowerCase());
      return nameMatch || moMatch;
    });
  }

  const searchResults = getSearchResults();
  const platformsToShow = searchInput.length > 0 ? searchResults : platforms;

  useEffect(() => {
    fetch(`${URL}/api/platforms`)
      .then((res) => res.json())
      .then((data) => setPlatforms(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="search-input">
        <form>
          <label htmlFor="searchInput">search 👀🔎 streamism: </label>
          <input
            className="input-box"
            placeholder="enter search term"
            type="search"
            id="searchInput"
            onChange={handleTextChange}
            value={searchInput}
          />
        </form>
      </div>
      <marquee behavior="scroll" direction="left">
      <h2>All Streamism.. 🎶</h2>
            </marquee>
      <marquee behavior="scroll" direction="right">
      <h2>🎼 Platforms!</h2>
            </marquee>
      <div className="platform-container">
        {platformsToShow.map((platform) => {
          return <Platform key={platform.id} platform={platform} />;
        })}
      </div>
    </>
  );
};

export default Platforms;
