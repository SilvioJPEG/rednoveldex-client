import { Link } from "react-router-dom";
import { novelInfo } from "../types/models";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Card, Paper } from "@mui/material";
type NovelWrapperProps = {
  novel: novelInfo | null;
  type?: "tiny" | "medium" | "big";
};
const NovelWrapper: React.FC<NovelWrapperProps> = ({ novel, type }) => {
  return novel ? (
    <div className={"novelWrapper" + " " + (type ?? 'tiny')}>
      <Link to={`/novel/${novel.id}`} title={novel.title}>
        <img src={novel.image} alt={novel.title} />
        <div className="frame"></div>
        <div className="overlay"></div>
      </Link>
    </div>
  ) : (
    <div className={"novelWrapper" + " " + type}>
      <Paper>
        <AddCircleIcon />
      </Paper>
    </div>
  );
};
export default NovelWrapper;
