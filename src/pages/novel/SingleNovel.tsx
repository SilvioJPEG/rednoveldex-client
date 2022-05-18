import styles from "../../styles/NovelPage.module.scss";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams, useNavigate } from "react-router-dom";
import JournalService from "../../api/journal.service";
import FavouritesService from "../../api/favourites.service";
import authStore from "../../store/authStore";
import NovelsService from "../../api/novels.service";
import novelStore from "../../store/novelPageStore";
import ReviewsSection from "./ReviewsSection";
import { observer } from "mobx-react-lite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { Bar } from "react-chartjs-2";
import Editor from "../../components/Editor";
import editorStore from "../../store/editorStore";
import { JournalEntry } from "../../typings/models";
import CircularProgress from "@mui/material/CircularProgress";

type SidebarInfoProps = {
  id: number;
};

const SidebarInfo: React.FC<SidebarInfoProps> = observer(({ id }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.posterWrapper}>
        <img
          src={novelStore.novel?.image}
          alt={novelStore.novel?.title}
          width={200}
        />
      </div>
      {authStore.loggedInStatus && (
        <div className={styles.actionsList}>
          <button
            className={styles.action}
            onClick={async () => {
              if (novelStore.inJournal && novelStore.novel) {
                editorStore.openEditor({
                  entity: novelStore.inJournal,
                  type: "edit",
                });
              }
              if (novelStore.novel && !novelStore.inJournal) {
                JournalService.addToJournal(id);
              }
              /*
                            if (novelStore.novel && !novelStore.inJournal) {
                editorStore.openEditor({
                  entity: novelStore.novel,
                  type: "add",
                });
              }
              */
            }}
          >
            {novelStore.inJournal ? (
              <>
                <span>{novelStore.inJournal.status}</span>
                <BookmarkIcon
                  className={novelStore.inJournal.status + "-icon"}
                  titleAccess="remove from Journal"
                />
              </>
            ) : (
              <>
                <span>add to journal</span>
                <BookmarkBorderIcon titleAccess="add to Journal" />
              </>
            )}
          </button>
          <button
            className={styles.action}
            onClick={() => FavouritesService.updateFavourites(Number(id))}
          >
            {novelStore.inFavourites ? (
              <FavoriteIcon
                sx={{ padding: "2px" }}
                className="favourited"
                titleAccess="remove from favourites"
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ padding: "2px" }}
                titleAccess="add to favourites"
              />
            )}
          </button>
        </div>
      )}
    </aside>
  );
});

const Description = observer(() => {
  const setReleaseDate = (ISO_date: string) => {
    const date = new Date(ISO_date);
    return date.toLocaleDateString("ru-RU");
  };
  return (
    <section className={styles.info}>
      <h1 className={styles.novelName}>{novelStore.novel?.title}</h1>
      {novelStore.novel?.aliases && (
        <div className={styles.aliases}>
          <b>Aliases: </b>
          <div className={styles.col}>
            {novelStore.novel?.aliases.split("\n").map((str) => (
              <span key={str}>{str}</span>
            ))}
          </div>
        </div>
      )}
      <div>
        <b>Release date: </b>
        {novelStore.novel ? setReleaseDate(novelStore.novel.release_date) : "-"}
      </div>
      <div className={styles.synopsis}>
        <b>Synopsis: </b>
        {novelStore.novel !== null ? novelStore.novel.description : "-"}
      </div>
    </section>
  );
});

const NovelPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    async function getPageData() {
      if (id === undefined) navigate("/");
      await NovelsService.getNovelData(Number(id));
      if (novelStore.novel === null) navigate("404");
      if (authStore.loggedInStatus) {
        await JournalService.checkIfInJournal(Number(id));
        await FavouritesService.checkIfFavourited(Number(id));
      }
      setLoading(false);
    }
    getPageData();
    return () => {
      novelStore.setEmpty();
    };
  }, [id, navigate]);
  const update = (data: JournalEntry) => {
    novelStore.journaled(true, data);
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={styles.novelPageWrapper}>
          <SidebarInfo id={Number(id)} />
          <div className={styles.rightCol}>
            <Description />
            {id && <ReviewsSection id={Number(id)} />}
          </div>
          <Editor replaceEntity={update} />
        </div>
      )}
    </>
  );
};

export default observer(NovelPage);
