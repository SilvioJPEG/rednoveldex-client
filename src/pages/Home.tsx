import axios from "axios";
import React from "react";
import styles from "../styles/Main.module.scss";
import { API_URL } from "../services/auth.service";
import NovelWrapper from "../components/NovelWrapper";
import { Novel } from "../types/models";

const Main: React.FC = () => {
  const [recentNovels, setRecentNovels] = React.useState<null | Novel[]>(null);
  async function getRecentNovels(amount: number) {
    const recentNovels = (await axios.get(`${API_URL}/novels/recent/${amount}`))
      .data;
    setRecentNovels(recentNovels);
  }
  React.useEffect(() => {
    getRecentNovels(4);
  }, []);
  return (
    <div className={styles.mainPage}>
      {recentNovels && (
        <section className={styles.recentlyAdded}>
          <h2 className="sectionHeading">Recently added</h2>
          <div className={styles.recentlyAdded__row}>
            {recentNovels.map((novel) => (
              <div key={novel.id}>
                <NovelWrapper novel={novel} type={"big"} />
              </div>
            ))}
          </div>
        </section>
      )}
      <section className={styles.reviewed}>
        <h2 className="sectionHeading">Just reviewed</h2>
        <div className={styles.posterList}></div>
      </section>
    </div>
  );
};

export default Main;
