import { Formik, Field, Form } from "formik";
import styles from "../../styles/NovelPage.module.scss";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams, useNavigate } from "react-router-dom";
import JournalService from "../../api/journal.service";
import FavouritesService from "../../api/favourites.service";
import Stack from "@mui/material/Stack";
import { Button, TextareaAutosize } from "@mui/material";
import authStore from "../../store/authStore";
import ReviewService from "../../api/review.service";
import { Novel, ReviewModel } from "../../types/models";
import NovelsService from "../../api/novels.service";
import ReviewWrapper from "../../components/Review";

const NovelPage: React.FC = () => {
  const [novelData, setNovelData] = React.useState<Novel | null>(null);
  const [inJournal, setInJournal] = React.useState<boolean>(false);
  const [inFavourites, setInFavourites] = React.useState<boolean>(false);
  const [reviews, setReviews] = React.useState<ReviewModel[]>([]);
  const [showInput, setShowInput] = React.useState<boolean>(false);
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
    if (authStore.loggedInStatus) {
      const currUserReview = await ReviewService.checkIfAlready(Number(id));
      if (currUserReview) {
        setReviews([...reviews, currUserReview]);
      } else {
        setShowInput(true);
      }
    }
    const reviewsData = await ReviewService.getReviews(Number(id));
    setReviews([...reviews, ...reviewsData]);
  };
  const setReleaseDate = (ISO_date: string) => {
    const date = new Date(ISO_date);
    return date.toLocaleDateString("ru-RU");
  };
  React.useEffect(() => {
    if (id === undefined) navigate("/");
    getNovelData();
    getReviews();
    if (authStore.loggedInStatus) {
      checkIfInJournal();
      checkIfFavourited();
    }
  }, []);

  return (
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
      <div className={styles.rightCol}>
        <section className={styles.info}>
          <h1 className={styles.novelName}>{novelData?.title}</h1>
          {novelData?.aliases && (
            <div className={styles.aliases}>
              <b>Aliases: </b>
              <div className={styles.col}>
                {novelData?.aliases.split("\n").map((str) => (
                  <span key={str}>{str}</span>
                ))}
              </div>
            </div>
          )}
          <div>
            <b>Release date: </b>
            {novelData ? setReleaseDate(novelData.release_date) : "-"}
          </div>
          <div className={styles.synopsis}>
            <b>Synopsis: </b>
            {novelData !== null ? novelData.description : "-"}
          </div>
        </section>
        {authStore.loggedInStatus && showInput && (
          <section className={styles.writeReview}>
            <h2 className="sectionHeading">Write your own review</h2>
            <Formik
              initialValues={{ content: "" }}
              validate={(values: { content: string }) => {
                const errors: any = {};
                if (!values.content) {
                  errors.content = "Required";
                }
                return errors;
              }}
              onSubmit={async (values) => {
                if (id) {
                  const uploadedReview = await ReviewService.addReview(
                    Number(id),
                    values.content
                  );
                  if (uploadedReview) {
                    setShowInput(false);
                    setReviews([uploadedReview, ...reviews]);
                  }
                }
              }}
            >
              <Form className={styles.form}>
                <Field
                  type="textarea"
                  name="content"
                  render={({
                    field,
                    form: { touched, errors },
                  }: {
                    field: any;
                    form: { touched: any; errors: any };
                  }) => (
                    <div>
                      <TextareaAutosize
                        {...field}
                        style={{ width: "100%" }}
                        minRows={6}
                      />
                      {touched[field.name] && errors[field.name] && (
                        <div
                          className="error"
                          style={{
                            position: "absolute",
                            color: "var(--accent-color)",
                          }}
                        >
                          {errors[field.name]}
                        </div>
                      )}
                    </div>
                  )}
                />
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </Form>
            </Formik>
          </section>
        )}
        <section className={styles.reviewsWrapper}>
          <h2 className="sectionHeading">Recent reviews</h2>
          {reviews.length > 0 &&
            reviews.map((review: ReviewModel, index) => (
              <ReviewWrapper key={index} review={review} />
            ))}
        </section>
      </div>
    </div>
  );
};

export default NovelPage;
