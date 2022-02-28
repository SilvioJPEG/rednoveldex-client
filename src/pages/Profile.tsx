import { Avatar } from "@mui/material";
import styles from "../styles/Profile.module.scss";
import { useParams } from "react-router-dom";
import poster from "../assets/sample.jpg";
import React from "react";
import axios from "axios";

type ProfileData = {
  username: string;
  avatar: string;
  favourites: number[];
};

type ProfileProps = {
  userData: ProfileData;
};

const Profile: React.FC<ProfileProps> = ({}) => {
  const { username } = useParams();
  const [userData, setUserData] = React.useState<ProfileData|null>(null);
  React.useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(`http://localhost:5000/users/${username}`);
      setUserData(res.data);
    }
    getUserData();
  }, []);
  return (
    <div className="contentWrapper">
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <Avatar sx={{ width: "100px", height: "100px" }} />
          <span className={styles.username}>{'@'+userData?.username}</span>
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
      <div className={styles.profileBody} style={{ width: "70%" }}>
        <section id={styles.favourites}>
          <h2>favourite novels</h2>
          <ul className={styles.novelList}>
            <li>
              <img src={poster} />
            </li>
          </ul>
        </section>
        <section id={styles.recentActivity}>
          <h2>recent activity</h2>
        </section>
        <section id={styles.lists}>
          <h2>lists</h2>
        </section>
      </div>
    </div>
  );
};
export default Profile;
