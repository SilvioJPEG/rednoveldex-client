import { Avatar, ButtonGroup, ListItemIcon } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "../styles/Header.module.scss";
import logo from "../assets/rednovel.png";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      id={styles.searchBar}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 200,
        backgroundColor: "var(--background-color)",
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1, color: "var(--text-color)" }} />
      <SearchIcon htmlColor="var(--text-color)" />
    </Paper>
  );
}

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
          {CustomizedInputBase()}
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
