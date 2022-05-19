import "../styles/novelWrapper.scss";
import { Link } from "react-router-dom";
import { BaseNovel } from "../typings/models";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Paper } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

type NovelWrapperProps = {
  novel: BaseNovel | null;
  type?: "tiny" | "medium" | "big";
  addBtnShowing: boolean;
};

function cx(...args: string[]): string {
  return args.join(" ");
}

const NovelWrapper: React.FC<NovelWrapperProps> = ({
  novel,
  type,
  addBtnShowing,
}) => {
  return novel?.image ? (
    <>
      <div
        className={cx(
          "novelWrapper",
          "novelWrapper_" + type ?? "tiny",
          novel.explicit ? "novelWrapper_blurred" : ""
        )}
      >
        <Link to={`/novel/${novel.id}`} title={novel.title}>
          <img src={novel.image} alt={novel.title} />
          {type === "big" && (
            <>
              <div className="novelWrapper__overlay">
                <div className="title">{novel.title}</div>
              </div>
            </>
          )}
        </Link>
        {type === "big" && addBtnShowing && (
          <div className="novelWrapper__journalBtn">
            <AddCircleOutlineOutlinedIcon />
          </div>
        )}
      </div>
    </>
  ) : (
    <div className={cx("novelWrapper", "novelWrapper_" + type ?? "tiny")}>
      <Paper>
        <AddCircleIcon />
      </Paper>
    </div>
  );
};
export default NovelWrapper;
