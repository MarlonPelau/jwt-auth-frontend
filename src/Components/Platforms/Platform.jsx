import { Link } from "react-router-dom";

const Platform = ({ platform }) => {
  return (
    <Link to={`/platforms/${platform.id}`}>
      <section className="platform-card">
        <img src={platform.image} alt={platform.name} />
        <h3>{platform.name}</h3>
        <p>
          <span>Rated:</span> {platform.rated}
        </p>
      </section>
    </Link>
  );
};

export default Platform;
