import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import styles from "../../styles/NovelPage.module.scss";
import sample from "../../assets/sample.jpg";
import { API_URL } from "../../services/auth.service";
import JournalService from "../../services/journal.service";
import FavouritesService from "../../services/favourites.service";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import authStore from "../../store/authStore";

type NovelData = {
  title: string;
  description: string;
  releaseDate: Date;
  poster?: string;
};

const NovelPage: React.FC = () => {
  const [novelData, setNovelData] = React.useState<NovelData | null>(null);
  const [inJournal, setInJournal] = React.useState<boolean>(false);
  const [inFavourites, setInFavourites] = React.useState<boolean>(false);
  const { id } = useParams();
  const getNovelData = async () => {
    const res = await axios.get(`${API_URL}/novels/${id}`);
    if (res.status === 200) setNovelData(res.data);
  };
  const checkIfInJournal = async () => {
    setInJournal(await JournalService.checkIfInJournal(Number(id)));
  };
  const updateJournal = async () => {
    const resInJournal = await JournalService.updateJournal(Number(id));
    if (resInJournal) {
      setInJournal(!inJournal);
    }
  };
  const checkIfFavourited = async () => {
    setInFavourites(await FavouritesService.checkIfFavourited(Number(id)));
  };
  const updateFavourites = async () => {
    const res = await FavouritesService.updateFavourites(Number(id));
    if (res.status === 200) {
      setInFavourites(!inFavourites);
    }
  };
  React.useEffect(() => {
    getNovelData();
    if (authStore.loggedInStatus) {
      checkIfInJournal();
      checkIfFavourited();
    }
  }, []);

  return (
    <div className="contentWrapper">
      <div className={styles.novelPageWrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.posterWrapper}>
            <img src={sample} alt="sample" width={200} />
          </div>
          {authStore.loggedInStatus && (
            <Stack direction="row" spacing={2}>
              <div
                className={styles.actionWrapper}
                onClick={() => updateJournal()}
              >
                {inJournal ? (
                  <BookmarkIcon
                    className={styles.actionUsed}
                    titleAccess="remove from Journal"
                  />
                ) : (
                  <BookmarkBorderIcon titleAccess="add to Journal" />
                )}
                <span>{inJournal ? "remove" : "add"}</span>
              </div>
              <div
                className={styles.actionWrapper}
                onClick={() => updateFavourites()}
              >
                {inFavourites ? (
                  <FavoriteIcon
                    className={styles.actionUsed}
                    titleAccess="remove from favourites"
                  />
                ) : (
                  <FavoriteBorderIcon titleAccess="add to favourites" />
                )}
                <span>{inFavourites ? "dislike" : "like"}</span>
              </div>
            </Stack>
          )}
        </aside>

        <section className={styles.info}>
          <h1 className={styles.novelName}>{novelData?.title}</h1>
          <span>
            <b>Premiered: </b>
            {novelData ? novelData.releaseDate : "-"}
          </span>
          <div className={styles.synopsis}>
            <h3>synopsis:</h3>
            <p>{novelData !== null ? novelData.description : "-"}</p>
          </div>
          <div className={styles.reviewsWrapper}>
            <b>Reviews:</b>
            <hr />
            <Formik
              initialValues={{ context: "" }}
              validate={(values: { context: string }) => {
                const errors: any = {};
                if (!values.context) {
                  errors.context = "Required";
                }
                return errors;
              }}
              onSubmit={async (values) => {}}
            >
              <Form className={styles.form}>
                <label htmlFor="context">Write your own review:</label>
                <Field type="text" as="textarea" rows="10" name="context" />
                <ErrorMessage name="context" component="div" />
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </Form>
            </Formik>
            <h2>Recent reviews:</h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NovelPage;
