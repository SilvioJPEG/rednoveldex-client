import { Link } from "react-router-dom";
import "../styles/Footer.scss";
type FooterProps = {
  replaceThemeTo: (theme: "dark" | "light") => void;
};

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className="footerWrapper">
      <footer>
        <div className="theme-picker">
          <h3>Site Theme</h3>
          <div>
            <button
              className="theme-preview dark"
              onClick={() => {
                props.replaceThemeTo("dark");
              }}
            >
              А
            </button>
            <button
              className="theme-preview light"
              onClick={() => {
                props.replaceThemeTo("light");
              }}
            >
              А
            </button>
          </div>
        </div>
        <div className="nav">
          <span className="navItem">
            <Link to="/about">About</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
