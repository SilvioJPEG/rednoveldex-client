import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (

      <div className="contentWrapper">
        <p>
          Track novels you’ve read. Save those you want to read. Tell your
          friends what is good.
        </p>
        <Link to="/login">
          <a>
            <button className="redBtn">Get started</button>
          </a>
        </Link>
      </div>
  );
};

export default Main;
