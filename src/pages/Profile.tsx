import { Avatar, Button } from "@mui/material";
import styles from "../styles/Profile.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { Novel, ReviewModel, UserData } from "../types/models";
import FavouritesService from "../services/favourites.service";
import NovelWrapper from "../components/NovelWrapper";
import ReviewsService from "../services/review.service";
import authStore from "../store/authStore";
import Review from "../components/Review";
import UsersService from "../services/user.service";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const { username } = useParams();
  let navigate = useNavigate();
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [favourites, setFavourites] = React.useState<Novel[] | null>(null);
  const [reviews, setReviews] = React.useState<ReviewModel[] | null>(null);
  const getUserData = async () => {
    if (username) {
      if (username) {
        const userData = await UsersService.getUserProfile(username);
        setUserData(userData);
        const favouritesRes = await FavouritesService.getAll(username);
        setFavourites(favouritesRes.data);
        const reviews = await ReviewsService.getReviewsByUser(username);
        setReviews(reviews);
      }
    }
  };
  React.useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <Avatar sx={{ width: "120px", height: "120px" }} />
          <div className={styles.usernameWrapper}>
            <span id={styles.username}>{userData?.username}</span>
            {username === authStore.user.username && (
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Edit profile
              </Button>
            )}
          </div>
        </div>

        <div className={styles.profileStats}>
          <div className={styles.statisticCol}>
            <span className={styles.value}>0</span>
            <span className={styles.definition}>novels</span>
          </div>
          <div className={[styles.statisticCol, styles.statBorder].join(" ")}>
            <span className={styles.value}>0</span>
            <span className={styles.definition}>this year</span>
          </div>
          <div className={[styles.statisticCol, styles.statBorder].join(" ")}>
            <span className={styles.value}>0</span>
            <span className={styles.definition}>lists</span>
          </div>
        </div>
      </div>
      <div className={styles.profileBody}>
        <section id={styles.favourites}>
          <h2>favourites</h2>
          <ul className={styles.novelList}>
            {favourites
              ? favourites.map((novel: Novel) => (
                  <li key={novel.id}>
                    {<NovelWrapper novel={novel} type={"small"} />}
                  </li>
                ))
              : "-"}
          </ul>
        </section>
        <section id={styles.recentActivity}>
          <h2>recent activity</h2>
        </section>
        <section id={styles.lists}>
          <h2>recent reviews</h2>
          {reviews ? reviews.map((review) => <Review review={review} />) : "-"}
        </section>
      </div>
    </div>
  );
};
export default Profile;
