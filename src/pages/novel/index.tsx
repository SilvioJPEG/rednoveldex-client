import { useFormik } from "formik";
import axios from "axios";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/NovelPage.module.scss";
import sample from "../../assets/sample.jpg";
import { API_URL } from "../../services/auth.service";
import JournalService from "../../services/journal.service";
import FavouritesService from "../../services/favourites.service";
import Stack from "@mui/material/Stack";
import { Button, InputBase } from "@mui/material";
import authStore from "../../store/authStore";
import ReviewService from "../../services/review.service";

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
  const navigate = useNavigate();
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
    if (id === undefined) navigate("/");
    getNovelData();
    if (authStore.loggedInStatus) {
      checkIfInJournal();
      checkIfFavourited();
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validate: (values: { content: string }) => {
      const errors: any = {};
      if (!values.content) {
        errors.content = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (id) {
        ReviewService.addReview(Number(id), values.content);
      }
    },
  });
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
          <h2>Information:</h2>
          <span>
            <b>Premiered: </b>
            {novelData ? novelData.releaseDate : "-"}
          </span>
          <div className={styles.synopsis}>
            <h3>synopsis:</h3>
            <p>{novelData !== null ? novelData.description : "-"}</p>
          </div>
          <div className={styles.reviewsWrapper}>
            <h2>Recent reviews:</h2>
            {authStore.loggedInStatus && (
              <form className={styles.form} onSubmit={formik.handleSubmit}>
                <InputBase
                  multiline
                  minRows={6}
                  id="content"
                  type="textarea"
                  name="content"
                  autoComplete="off"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.content && Boolean(formik.errors.content)
                  }
                  sx={{
                    color: "var(--input-text-color)",
                    backgroundColor: "var(--input-background-color)",
                    borderBottom: "1px solid var(--input-text-color)",
                    borderRadius: "4px",
                    padding: "5px 10px",
                  }}
                />
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NovelPage;
