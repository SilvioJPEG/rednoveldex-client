import React from "react";
import Ouran404 from "../assets/404.jpg";

interface TypeWriterProps {
  content?: string;
  speed?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  content = "",
  speed = 1000,
}) => {
  const [displayedContent, setDisplayedContent] = React.useState("");
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const animKey = setInterval(() => {
      setIndex((index: number) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/
        console.log(content.slice(0, index));

        if (index >= content.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, []);

  return <p className="type-writer">{}</p>;
};

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
