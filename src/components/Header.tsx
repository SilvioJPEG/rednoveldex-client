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
        {" "}
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        {!authStore.loggedInStatus && (
          <div className={styles.nav}>
            <span className={styles.navItem}>
              <Link to="/registration">Create account</Link>
            </span>
            or
            <span className={styles.navItem}>
              <Link to="/login">Login</Link>
            </span>
          </div>
        )}
        <div className={styles.nav}>
          {<SearchBar/>}
          {authStore.loggedInStatus && (
            <>
              <ButtonGroup>
                <Button variant="contained" color="success">
                  <Link to="/novel/add">Log</Link>
                </Button>
                <Button variant="contained" color="success">
                  <Link to="/list/new">New list</Link>
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
