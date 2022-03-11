import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NovelsService from "../services/novels.service";
import { Novel, ReviewModel } from "../types/models";
import NovelWrapper from "./NovelWrapper";
type reviewProps = {
  review: ReviewModel;
  showPoster: boolean;
};
const ReviewWrapper: React.FC<reviewProps> = ({ review, showPoster }) => {
  const [novel, setNovel] = React.useState<Novel | null>(null);
  React.useEffect(() => {
    if (showPoster) {
      NovelsService.getNovelData(review.novel_id).then((novelData) => {
        setNovel(novelData);
      });
    }
  }, []);
  return (
    <div className="review">
      {showPoster && (
        <div>
          <NovelWrapper novel={novel} type={"medium"} />
        </div>
      )}
      {!showPoster && (
        <div style={{ paddingTop: "10px" }}>
          <Avatar sx={{ backgroundColor: "var(--text-color)" }} />
        </div>
      )}

      <div className="review__body">
        <Link className="title" to={`/novel/${novel?.id}`}>
          {novel?.title}
        </Link>
        {!showPoster && (
          <Link to={`/u/${review.user.username}`}>
            <div className="reviewer">
              Reviewed by <b>{review.user.username}</b>
            </div>
          </Link>
        )}
        <p>{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewWrapper;
