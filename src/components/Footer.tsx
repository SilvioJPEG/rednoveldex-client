type FooterProps = {
  replaceThemeTo: (theme: "dark" | "light") => void;
};

const Footer: React.FC<FooterProps> = (props) => {
  return (
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
    </footer>
  );
};

export default Footer;
