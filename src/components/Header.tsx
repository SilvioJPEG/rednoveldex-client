import { Avatar } from "@mui/material";
import styles from "../styles/Header.module.scss";
import logo from "../assets/rednovel.png";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

type MenuProps = {
  menuName: string;
}

const BasicMenu: React.FC<MenuProps> = ({menuName}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
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
      >
        {menuName}
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.nav}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        {authStore.user.username && (
          <span className={styles.navItem}>
            <Link to={`/u/${authStore.user.username}`}>
              <Avatar sx={{ width: "40px", height: "40px" }} />
            </Link>
          </span>
        )}
        {authStore.loggedInStatus && (
          <Link to="/novel/add">
            <button className="redBtn">Add</button>
          </Link>
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
        {authStore.loggedInStatus && (
          <span className={styles.navItem} onClick={() => authStore.logout()}>
            <LogoutIcon />
          </span>
        )}
      </div>
    </header>
  );
};
export default observer(Header);
