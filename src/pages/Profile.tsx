import { Avatar, Button } from "@mui/material";
import styles from "../styles/Profile.module.scss";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import React from "react";
import { novelInfo, ProfileType, ReviewModel } from "../types/models";
import NovelWrapper from "../components/NovelWrapper";
import Review from "../components/Review";
import AppService from "../services/app.service";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import authStore from "../store/authStore";

type ProfileProps = {};
const Profile: React.FC<ProfileProps> = () => {
  const { username } = useParams();
  let navigate = useNavigate();
  const [ProfileData, setProfileData] = React.useState<ProfileType | null>(
    null
  );
  const [favourites, setFavourites] = React.useState<novelInfo[] | null>(null);
  const [reviews, setReviews] = React.useState<ReviewModel[] | null>(null);
  const getProfileData = async () => {
    if (username) {
      const data = await AppService.getProfileData(username);
      const { reviews, favourites, ...ProfileData } = data;
      setProfileData(ProfileData);
      setReviews(data.reviews);
      setFavourites(data.favourites);
    }
  };
  const getJoinedDate = (ISO_date: string) => {
    const createdAt = new Date(ISO_date);
    return (
      createdAt.toLocaleDateString("default", { month: "long" }) +
      " " +
      createdAt.getFullYear()
    );
  };
  React.useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div>
      {ProfileData && ProfileData.User.headerPhoto && (
        <div className={styles.profileHeader__photo}>
          <img
            src={ProfileData.User.headerPhoto}
            alt={ProfileData.User.username + "`s header photo"}
          />
        </div>
      )}
      <div className={styles.profileHeader}>
        {ProfileData && (
          <>
            <div className={styles.avatarWrapper}>
              <Avatar
                sx={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid var(--text-color)",
                  color: "var(--background-color)",
                  bgcolor: "var(--text-color)",
                  fontSize: "40px",
                }}
              >
                {ProfileData.User.username[0].toUpperCase()}
              </Avatar>
            </div>
            <div className={styles.profileStatsWrapper}>
              <div className={styles.profileStats}>
                <div className={styles.usernameWrapper}>
                  <span id={styles.username}>{ProfileData?.User.username}</span>
                  <div>
                    {ProfileData.User.location && (
                      <span>
                        <LocationOnIcon />
                        {ProfileData.User.location}
                      </span>
                    )}
                    {ProfileData.User.createdAt && (
                      <span id={styles.joinedDate} title="created date">
                        <CalendarMonthIcon />
                        {getJoinedDate(ProfileData.User.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.profileLinks}>
                  <div className={styles.statisticCol}>
                    <Link to={`/u/${username}/journal`}>
                      <span className={styles.value}>
                        {ProfileData ? ProfileData.journalLength : ""}
                      </span>
                      <span className={styles.definition}>novels</span>
                    </Link>
                  </div>
                  <div className={styles.statisticCol}>
                    <Link
                      to={`/u/${username}/lists`}
                      style={{ borderRight: 0 }}
                    >
                      <span className={styles.value}>
                        {ProfileData ? ProfileData.listsAmount : ""}
                      </span>
                      <span className={styles.definition}>lists</span>
                    </Link>
                  </div>
                </div>
              </div>
              {authStore.user.username === username && (
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ fontSize: "10px", fontWeight: "700" }}
                  onClick={()=>navigate('/settings')}
                >
                  Edit profile
                </Button>
              )}
            </div>
          </>
        )}
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
                <Review key={index} review={review} />
              ))
            : "-"}
        </section>
      </div>
    </div>
  );
};
export default Profile;
