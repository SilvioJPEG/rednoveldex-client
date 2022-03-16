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
              <span
                className={styles.navItem}
                onClick={() => authStore.logout()}
              >
                Logout
              </span>
            </>
          )}
        </div>
        <div className={styles.nav}>
          {<SearchBar />}
          {authStore.loggedInStatus && (
            <>
              <ButtonGroup>
                <Button variant="contained" sx={{ padding: "0" }}>
                  <Link
                    to="/novel/add"
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: "10px",
                    }}
                  >
                    Log
                  </Link>
                </Button>
                <Button variant="contained" sx={{ padding: "0" }}>
                  <Link
                    to="/lists/new"
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: "10px",
                    }}
                  >
                    New list
                  </Link>
                </Button>
              </ButtonGroup>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default observer(Header);
