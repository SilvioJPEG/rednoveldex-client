import { Avatar } from "@mui/material";
import styles from "../styles/Profile.module.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import React from "react";
import { novelInfo, ReviewModel, UserData } from "../types/models";
import NovelWrapper from "../components/NovelWrapper";
import Review from "../components/Review";
import AppService from "../services/app.service";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const { username } = useParams();
  let navigate = useNavigate();
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [favourites, setFavourites] = React.useState<novelInfo[] | null>(null);
  const [reviews, setReviews] = React.useState<ReviewModel[] | null>(null);
  const getProfileData = async () => {
    if (username) {
      const data = await AppService.getProfileData(username);
      setUserData(data);
      setReviews(data.reviews);
      setFavourites(data.favourites);
    }
  };
  React.useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <Avatar
            sx={{
              width: "120px",
              height: "120px",
              backgroundColor: "var(--text-color)",
            }}
          />
          <div className={styles.usernameWrapper}>
            <span id={styles.username}>{userData?.username}</span>
            <span id={styles.bio}>{userData?.bio}</span>
          </div>
        </div>

        <div className={styles.profileStats}>
          <div className={styles.statisticCol}>
            <Link to={`/u/${username}/journal`}>
              <span className={styles.value}>
                {userData ? userData.journalLength : "0"}
              </span>
              <span className={styles.definition}>novels</span>
            </Link>
          </div>
          <div className={[styles.statisticCol, styles.statBorder].join(" ")}>
            <Link to={`/u/${username}/lists`}>
              <span className={styles.value}>
                {userData ? userData.listsAmount : "0"}
              </span>
              <span className={styles.definition}>lists</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.profileBody}>
        <section id={styles.favourites}>
          <h2 className="sectionHeading">favourites</h2>
          <ul className={styles.favouritesList}>
            {favourites
              ? favourites.map((novel: novelInfo) => (
                  <li key={novel.id}>
                    {<NovelWrapper novel={novel} type={"big"} />}
                  </li>
                ))
              : "-"}
          </ul>
        </section>
        <section id={styles.lists}>
          <h2 className="sectionHeading">recent reviews</h2>
          {reviews
            ? reviews.map((review, index) => (
                <Review key={index} review={review} showPoster={true} />
              ))
            : "-"}
        </section>
      </div>
    </div>
  );
};
export default Profile;
