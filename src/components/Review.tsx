import { Avatar, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ReviewWrapper.module.scss";
import {
  ReviewModelWithUser,
  ReviewModelWithNovel,
  ReviewModel,
} from "../types/models";
import NovelWrapper from "./NovelWrapper";
import AuthStore from "../store/authStore";
import Popup from "./Popup";

type reviewProps = {
  review: ReviewModel;
};

const ReviewWithPoster = (review: ReviewModelWithNovel) => {
  return (
    <>
      <div style={{ alignSelf: "flex-start", marginTop: "15px" }}>
        <NovelWrapper novel={review.Novel} type={"medium"} />
      </div>

      <div className={styles.review__body}>
        <Link className={styles.title} to={`/novel/${review.Novel.id}`}>
          {review.Novel.title}
        </Link>
        <p className={styles.content}>{review.content}</p>
      </div>
    </>
  );
};

const ReviewWithUserInfo = (review: ReviewModelWithUser) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [deletePopup, setDeletePopup] = React.useState<boolean>(false);
  const showEditButton = () => {
    if (AuthStore.loggedInStatus && AuthStore.user.username) {
      return review.User.username === AuthStore.user.username;
    }
    return false;
  };
  const setPostedDate = (ISO_date: string) => {
    const date = new Date(ISO_date);
    return date.toLocaleDateString("ru-RU");
  };
  const saveReview = () => {
    setLoading(true);
  }
  return (
    <>
      {!editing && (
        <>
          <div style={{ paddingTop: "10px" }}>
            <Link to={`/u/${review.User.username}`}>
              <Avatar sx={{ backgroundColor: "var(--text-color)" }} />
            </Link>
          </div>
          <div className={styles.review__body}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.reviewer}>
                Reviewed by{" "}
                <Link to={`/u/${review.User.username}`}>
                  <b>{review.User.username}</b>
                </Link>
              </div>
              {review.updatedAt && (
                <span title={new Date(review.updatedAt).toLocaleString()}>
                  {setPostedDate(review.updatedAt)}
                </span>
              )}
            </div>
            <p className={styles.content}>{review.content}</p>
            {showEditButton() && (
              <Button
                variant="outlined"
                sx={{ alignSelf: "flex-start" }}
                onClick={() => setEditing(!editing)}
              >
                Edit
              </Button>
            )}
          </div>
        </>
      )}
      {editing && (
        <div className={styles.editReview}>

          <div className={styles.btnRow}>
            <div>
              <Button variant="contained" color="success" disabled={loading} onClick={()=>saveReview()} sx={{marginRight: '15px'}}>
                Save
              </Button>
              <Button color="secondary" disabled={loading} onClick={() => setEditing(!editing)}>
                Cancel
              </Button>
            </div>
            <Button variant="outlined" disabled={loading} color="error" >Delete</Button>
          </div>
        </div>
      )}
    </>
  );
};

const ReviewWrapper: React.FC<reviewProps> = ({ review }) => {
  return (
    <div className={styles.review}>
      {"User" in review ? ReviewWithUserInfo(review) : ReviewWithPoster(review)}
    </div>
  );
};

export default ReviewWrapper;
