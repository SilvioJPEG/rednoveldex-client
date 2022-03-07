import { useFormik } from "formik";
import styles from "../../styles/NovelPage.module.scss";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams, useNavigate } from "react-router-dom";
import JournalService from "../../services/journal.service";
import FavouritesService from "../../services/favourites.service";
import Stack from "@mui/material/Stack";
import { Button, InputBase } from "@mui/material";
import authStore from "../../store/authStore";
import ReviewService from "../../services/review.service";
import { Novel, Review } from "../../types/models";
import NovelsService from "../../services/novels.service";
import ReviewWrapper from "../../components/Review";

const NovelPage: React.FC = () => {
  const [novelData, setNovelData] = React.useState<Novel | null>(null);
  const [inJournal, setInJournal] = React.useState<boolean>(false);
  const [inFavourites, setInFavourites] = React.useState<boolean>(false);
  const [reviews, setReviews] = React.useState<null | Review[]>(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const getNovelData = async () => {
    const novelData = await NovelsService.getNovelData(Number(id));
    setNovelData(novelData);
  };
  const checkIfInJournal = async () => {
    const inJournalBoolean = await JournalService.checkIfInJournal(Number(id));
    setInJournal(inJournalBoolean);
  };
  const updateJournal = async () => {
    const resInJournal = await JournalService.updateJournal(Number(id));
    if (resInJournal) {
      setInJournal(!inJournal);
    }
  };
  const checkIfFavourited = async () => {
    const inFavBoolean = await FavouritesService.checkIfFavourited(Number(id));
    setInFavourites(inFavBoolean);
  };
  const updateFavourites = async () => {
    const status = await FavouritesService.updateFavourites(Number(id));
    if (status === 200) {
      setInFavourites(!inFavourites);
    }
  };
  const getReviews = async () => {
    const reviewsData = await ReviewService.getReviews(Number(id));
    setReviews(reviewsData);
  };
  React.useEffect(() => {
    if (id === undefined) navigate("/");
    getNovelData();
    if (authStore.loggedInStatus) {
      checkIfInJournal();
      checkIfFavourited();
      getReviews();
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
            <img src={novelData?.image} alt={novelData?.title} width={200} />
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
        <section className={styles.rightCol}>
          <div className={styles.info}>
            <h1 className={styles.novelName}>{novelData?.title}</h1>
            <h2>Information:</h2>
            <span>
              <b>Release date: </b>
              {novelData ? novelData.releaseDate : "-"}
            </span>
            <div className={styles.synopsis}>
              <b>synopsis: </b>
              {novelData !== null ? novelData.description : "-"}
            </div>
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
            {reviews &&
              reviews.map((review: Review, index) => (
                <ReviewWrapper key={index} review={review} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NovelPage;
