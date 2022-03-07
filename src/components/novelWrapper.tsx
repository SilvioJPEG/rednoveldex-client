import { Link } from "react-router-dom";
import { Novel } from "../types/models";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Paper } from "@mui/material";
type NovelWrapperProps = {
  novel: Novel | null;
  type: "small" | "big";
};
const NovelWrapper: React.FC<NovelWrapperProps> = ({ novel, type }) => {
  return novel ? (
    <Link to={`/novel/${novel.id}`}>
      <div className={"novelWrapper" + " " + type}>
        <img src={novel.image} alt={novel.title} />
        <div className="frame"></div>
        <div className="overlay"></div>
      </div>
    </Link>
  ) : (
    <div className={"novelWrapper" + " " + type}>
      <Paper>
        <AddCircleIcon />
      </Paper>
    </div>
  );
};
export default NovelWrapper;
