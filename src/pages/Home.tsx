import React from "react";
import styles from "../styles/Home.module.scss";
import NovelWrapper from "../components/NovelWrapper";
import { novelInfo, ReviewModel } from "../types/models";
import Review from "../components/Review";
import AppService from "../services/app.service";

const Main: React.FC = () => {
  const [recentNovels, setRecentNovels] = React.useState<null | novelInfo[]>(
    null
  );
  const [reviews, setReviews] = React.useState<null | ReviewModel[]>(null);

  React.useEffect(() => {
    AppService.getHomePageData()
      .then((data) => {
        setRecentNovels(data.novels);
        setReviews(data.reviews);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className={styles.mainPage}>
      {recentNovels && (
        <section className={styles.recentlyAdded}>
          <h2 className="sectionHeading">Recently added</h2>
          <div className={styles.recentlyAdded__row}>
            {recentNovels.map((novel: novelInfo) => (
              <div key={novel.id}>
                <NovelWrapper novel={novel} type={"big"} />
              </div>
            ))}
          </div>
        </section>
      )}
      {reviews && (
        <section className={styles.reviewed}>
          <h2 className="sectionHeading">Just reviewed</h2>
          <div className={styles.reviewsList}>
            {reviews.map((review: ReviewModel, index) => (
              <Review key={index} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Main;
