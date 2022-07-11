import { Avatar, Button } from "@mui/material";
import styles from "../../styles/Profile.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import profileStore from "../../store/profilePageStore";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";

type ProfileHeaderProps = {
  username: string | undefined;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => {
  let navigate = useNavigate();
  function stringToHslColor(str: string, s: number, l: number): string {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  }
  const getJoinedDate = (ISO_date: string) => {
    const createdAt = new Date(ISO_date);
    return (
      createdAt.toLocaleDateString("default", { month: "long" }) +
      " " +
      createdAt.getFullYear()
    );
  };
  const getClassSelectedLink = (
    type: "overview" | "journal" | "lists"
  ): string | undefined => {
    if (profileStore.body === type) {
      return "link_selected";
    }
  };
  return (
    <div className={"profileHeader"}>
      {profileStore.User && (
        <>
          {profileStore.User.headerCover && profileStore.User.headerCover && (
            <div className={styles.profileHeader__cover}>
              <img
                src={profileStore.User.headerCover}
                alt={profileStore.User.username + "`s header cover"}
              />
            </div>
          )}
          <div className={styles.profileHeader__content}>
            <div>
              <Avatar
                sx={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid var(--text-color)",
                  color: "var(--background-color)",
                  bgcolor: stringToHslColor(profileStore.User.username, 70, 80),
                  fontSize: "40px",
                }}
                variant="square"
              >
                {profileStore.User.username[0].toUpperCase()}
              </Avatar>
              <div className={styles.profileHeader__content__info}>
                <span id={styles.username}>{profileStore.User?.username}</span>
                {profileStore.User.location && (
                  <span>
                    <LocationOnIcon />
                    {profileStore.User.location}
                  </span>
                )}
                {profileStore.User.createdAt && (
                  <span id={styles.joinedDate} title="created date">
                    <CalendarMonthIcon />
                    {getJoinedDate(profileStore.User.createdAt)}
                  </span>
                )}
                {authStore.user.username === username && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ fontSize: "10px", fontWeight: "700" }}
                    onClick={() => navigate("/settings")}
                  >
                    Edit profile
                  </Button>
                )}
              </div>
            </div>
            <div className={styles.stats}>
              <div className={styles.stats__col}>
                <span className={styles.value}>
                  {profileStore.journalLength ?? ""}
                </span>
                <span className={styles.definition}>Total novels</span>
              </div>
              <div className={styles.stats__col}>
                <span className={styles.value}>
                  {profileStore.listsAmount ?? ""}
                </span>
                <span className={styles.definition}>lists</span>
              </div>
            </div>
          </div>
          <div className={styles.profileHeader__navMenu}>
            <Link
              to={`/user/${username}`}
              className={getClassSelectedLink("overview")}
            >
              Overview
            </Link>
            <Link
              to={`/user/${username}/journal`}
              className={getClassSelectedLink("journal")}
            >
              Journal
            </Link>
            <Link
              to={`/user/${username}/lists`}
              className={getClassSelectedLink("lists")}
            >
              Lists
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(ProfileHeader);
