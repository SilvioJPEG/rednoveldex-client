import { Avatar, ButtonGroup, ListItemIcon } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "../styles/Header.module.scss";
import logo from "../assets/rednovel.png";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FaceIcon from "@mui/icons-material/Face";
import React from "react";
import { Logout } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

const DropdownMenu = observer(() => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <div>{authStore.user.username}</div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/u/${authStore.user.username}`}>
            <ListItemIcon>
              <FaceIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={`/u/${authStore.user.username}/journal`}>Journal</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/settings">Settings</Link>
        </MenuItem>

        <MenuItem
          onClick={() => {
            authStore.logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
});

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className={styles.nav}>
        <TextField variant="outlined" />
        {authStore.loggedInStatus && (
          <>
            <DropdownMenu />
            <ButtonGroup>
              <Button variant="contained" color="success">
                <Link to="/novel/add">Log</Link>
              </Button>
              <Button variant="contained" color="success">
                <KeyboardArrowDownIcon />
              </Button>
            </ButtonGroup>
          </>
        )}
        {!authStore.loggedInStatus && (
          <>
            <span className={styles.navItem}>
              <Link to="/registration">Create account</Link>
            </span>
            <span className={styles.navItem}>
              <Link to="/login">
                <LoginIcon />
              </Link>
            </span>
          </>
        )}
      </div>
    </header>
  );
};
export default observer(Header);
