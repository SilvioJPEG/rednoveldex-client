import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, TextareaAutosize } from "@mui/material";
import ReviewWrapper from "../../components/Review";
import styles from "../../styles/NovelPage.module.scss";
import { ReviewModel } from "../../types/models";
import ReviewService from "../../api/review.service";
import authStore from "../../store/authStore";

type ReviewsSectionProps = {
  id: number;
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ id }) => {
  const [reviews, setReviews] = React.useState<ReviewModel[]>([]);
  const [showInput, setShowInput] = React.useState<boolean>(false);

  React.useEffect(() => {
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
    getReviews();
  }, []);

  return (
    <>
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
              const uploadedReview = await ReviewService.addReview(
                id,
                values.content
              );
              if (uploadedReview) {
                setShowInput(false);
                setReviews([uploadedReview, ...reviews]);
              }
            }}
          >
            <Form className={styles.form}>
              <Field type="textarea" name="content">
                {({
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
              </Field>
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
    </>
  );
};
export default ReviewsSection;
