import React from "react";
import styles from "../../styles/Profile.module.scss";
import { BaseNovel } from "../../typings/models";
import NovelWrapper from "../../components/NovelWrapper";
import Review from "../../components/Review";
import profileStore from "../../store/profilePageStore";
import { observer } from "mobx-react-lite";

const ProfileHome: React.FC = () => {
  React.useEffect(() => {
    profileStore.setBody("overview");
  }, []);
  return (
    <div className={styles.profileBody}>
      <section id={styles.favourites}>
        <h2 className="sectionHeading">favourites</h2>
        <ul className={styles.favouritesList}>
          {profileStore.favourites
            ? profileStore.favourites.map((novel: BaseNovel) => (
                <li key={novel.id}>
                  {
                    <NovelWrapper
                      novel={novel}
                      type={"big"}
                      addBtnShowing={false}
                    />
                  }
                </li>
              ))
            : "-"}
        </ul>
      </section>
      <section id={styles.lists}>
        <h2 className="sectionHeading">recent reviews</h2>
        {profileStore.reviews
          ? profileStore.reviews.map((review, index) => (
              <Review key={index} review={review} />
            ))
          : "-"}
      </section>
    </div>
  );
};

export default observer(ProfileHome);
