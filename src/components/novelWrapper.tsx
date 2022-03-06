import { Link } from "react-router-dom";
import { Novel } from "../types/models";
import poster from "../assets/sample.jpg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
type NovelWrapperProps = {
  novel: Novel | null;
  type: "small" | "big";
};
const NovelWrapper: React.FC<NovelWrapperProps> = ({ novel, type }) => {
  return novel ? (
    <Link to={`/novel/${novel.id}`}>
      <div className={"novelWrapper" + " " + type}>
        <img src={poster} alt={novel.title} />
        <div className="frame"></div>
        <div className="overlay"></div>
      </div>
    </Link>
  ) : (
    <div className={"novelWrapper" + " " + type}>
      <AddCircleIcon />
    </div>
  );
};
export default NovelWrapper;
