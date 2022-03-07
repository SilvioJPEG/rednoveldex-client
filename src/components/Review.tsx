import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Review } from "../types/models";
type reviewProps = {
  review: Review;
};
const ReviewWrapper: React.FC<reviewProps> = ({ review }) => {
  return (
    <div className="review">
      <div style={{paddingTop:'10px'}}>
        <Avatar />
      </div>

      <div className="review__body">
        <Link to={`/u/${review.user.username}`}>
          <div className="reviewer">
            Reviewed by <b>{review.user.username}</b>
          </div>
        </Link>
        <div className="content">{review.content}</div>
      </div>
    </div>
  );
};

export default ReviewWrapper;
