import { Avatar, ButtonGroup, ListItemIcon } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "../styles/Header.module.scss";
import logo from "../assets/rednovel.png";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import Button from "@mui/material/Button";
import React from "react";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerWrapper__content}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className={styles.nav}>
          {!authStore.loggedInStatus && (
            <>
              <span className={styles.navItem} style={{ marginLeft: "20px" }}>
                <Link to="/registration">Create account</Link>
              </span>
              or
              <span className={styles.navItem}>
                <Link to="/login">Sign in</Link>
              </span>
            </>
          )}
          {authStore.loggedInStatus && (
            <>
              <span className={styles.navItem}>
                <Link to={`u/${authStore.user.username}/lists`}>Lists</Link>
              </span>
              <span className={styles.navItem}>
                <Link to={`/u/${authStore.user.username}/journal`}>
                  Journal
                </Link>
              </span>
              <span className={styles.navItem}>
                <Link to={`/u/${authStore.user.username}`}>Profile</Link>
              </span>
              <span className={styles.navItem}>
                <Link to={`/novel/add`}>Add new VN</Link>
              </span>
              <span className={styles.navItem}>
                <Link to={`/lists/new`}>Create a list</Link>
              </span>
              <span
                className={styles.navItem}
                onClick={() => authStore.logout()}
              >
                Logout
              </span>
            </>
          )}
          <SearchBar />
        </div>
      </div>
    </header>
  );
};
export default observer(Header);
