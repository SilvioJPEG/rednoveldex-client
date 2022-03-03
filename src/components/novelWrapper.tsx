import { Link } from "react-router-dom";
import { Novel } from "../types/models";
import poster from "../assets/sample.jpg";

const novelWrapper = (novel: Novel) => {
  return (
    <Link to={`/novel/${novel.id}`} className="novelWrapper">
      <img src={poster} alt={novel.title} />
      <div className="frame"></div>
      <div className="overlay"></div>
    </Link>
  );
};
export default novelWrapper;
