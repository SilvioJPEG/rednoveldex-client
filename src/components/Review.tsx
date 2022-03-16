import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ReviewWrapper.module.scss";
import { ReviewModel } from "../types/models";
import NovelWrapper from "./NovelWrapper";
type reviewProps = {
  review: ReviewModel;
  showPoster: boolean;
};
const ReviewWrapper: React.FC<reviewProps> = ({ review, showPoster }) => {
  return (
    <div className={styles.review}>
      {showPoster && (
        <div>
          <NovelWrapper novel={review.Novel} type={"medium"} />
        </div>
      )}
      {!showPoster && (
        <div style={{ paddingTop: "10px" }}>
          <Avatar sx={{ backgroundColor: "var(--text-color)" }} />
        </div>
      )}

      <div className={styles.review__body}>
        {showPoster && (
          <Link className={styles.title} to={`/novel/${review.Novel.id}`}>
            {review.Novel.title}
          </Link>
        )}

        {!showPoster && (
          <div className={styles.reviewer}>
            Reviewed by{" "}
            <Link to={`/u/${review.User.username}`}>
              <b>{review.User.username}</b>{" "}
            </Link>
          </div>
        )}
        <p className={styles.content}>{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewWrapper;
