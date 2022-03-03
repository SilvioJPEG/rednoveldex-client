import axios from "axios";
import React from "react";
import styles from "../styles/Main.module.scss";
import { API_URL } from "../services/AuthService";
import novelWrapper from "../components/novelWrapper";
import { Novel } from "../types/models";

const Main: React.FC = () => {
  const [recentNovels, setRecentNovels] = React.useState<null | Novel[]>(null);
  async function getRecentNovels(amount: number) {
    const recentNovels = (await axios.get(`${API_URL}/novels/recent/${amount}`))
      .data;
    console.log(recentNovels);
    setRecentNovels(recentNovels);
  }
  React.useEffect(() => {
    getRecentNovels(4);
  }, []);
  return (
    <div className="contentWrapper">
      {recentNovels && (
        <div className={styles.recentlyAdded}>
          <h2>Recently added to database:</h2>
          <hr />
          <div>
            {recentNovels.map((novel) => (
              <div key={novel.id}>
                {novelWrapper(novel)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
