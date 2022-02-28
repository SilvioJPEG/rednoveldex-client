import styles from "../styles/Header.module.scss";
import logo from "../assets/rednovel.png";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.nav}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className={styles.navItem}>
          <Link to="/user">Profile</Link>
        </div>
        <div className={styles.navItem}>
          <Link to="/login">Sign in</Link>
        </div>
        <div className={styles.navItem}>
          <Link to="/registration">Create account</Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
