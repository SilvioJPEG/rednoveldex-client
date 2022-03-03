import { Avatar } from "@mui/material";
import styles from "../styles/Profile.module.scss";
import { useParams, Navigate } from "react-router-dom";
import poster from "../assets/sample.jpg";
import React from "react";
import axios from "axios";
import { Novel, UserData } from "../types/models";
import { $api } from "../services/AuthService";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const { username } = useParams();
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [favourites, setFavourites] = React.useState<Novel[] | null>(null);
  const getUserData = async () => {
    const res = await $api.get(`/users/${username}`);
    if (res.status !== 404) setUserData(res.data);
  };
  React.useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="contentWrapper">
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <Avatar sx={{ width: "100px", height: "100px" }} />
          <span className={styles.username}>{"@" + userData?.username}</span>
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
          <h2>favourite novels:</h2>
          <ul className={styles.novelList}>
            {favourites
              ? favourites?.map((novel: Novel) => <li key={novel.id}></li>)
              : ""}
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
