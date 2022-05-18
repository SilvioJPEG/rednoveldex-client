import Ouran404 from "../assets/404.jpg";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <h1>404 — Not found</h1>
      <img src={Ouran404} alt="404" />
    </div>
  );
};
export default NotFound;
