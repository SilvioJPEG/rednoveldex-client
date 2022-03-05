import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import styles from "../styles/Sidebar.module.scss";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import SummarizeIcon from "@mui/icons-material/Summarize";
import HomeIcon from "@mui/icons-material/Home";
const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Link to={`/`}>
        <div className={styles.sidebarBtn}>
          <HomeIcon />
          <span>Home</span>
        </div>
      </Link>
      <Link to={`/u/${authStore.user.username}/journal`}>
        <div className={styles.sidebarBtn}>
          <LibraryBooksIcon />
          <span>Journal</span>
        </div>
      </Link>
      <Link to={`/u/${authStore.user.username}`}>
        <div className={styles.sidebarBtn}>
          <PersonIcon />
          <span>Profile</span>
        </div>
      </Link>

      <Link to={`/lists`}>
        <div className={styles.sidebarBtn}>
          <SummarizeIcon />
          <span>Lists</span>
        </div>
      </Link>
    </aside>
  );
};
export default observer(Sidebar);
