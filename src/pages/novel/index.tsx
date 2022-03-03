import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import React from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useParams } from "react-router-dom";
import styles from "../../styles/NovelPage.module.scss";
import sample from "../../assets/sample.jpg";
import { API_URL } from "../../services/AuthService";
import JournalService from "../../services/JournalService";
type NovelData = {
  title: string;
  description: string;
  releaseDate: Date;
  poster?: string;
};
const NovelPage: React.FC = () => {
  const [novelData, setNovelData] = React.useState<NovelData | null>(null);
  const [inJournal, setInJournal] = React.useState<boolean>(false);
  const { id } = useParams();
  const getNovelData = async () => {
    const res = await axios.get(`${API_URL}/novels/${id}`);
    if (res.status === 200) setNovelData(res.data);
  };
  const checkIfInJournal = async () => {
    setInJournal(await JournalService.checkIfInJournal(Number(id)));
  };
  React.useEffect(() => {
    getNovelData();
    checkIfInJournal();
  }, []);
  return (
    <div className="contentWrapper">
      <div className={styles.novelPageWrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.posterWrapper}>
            <img src={sample} alt="sample" width={200} />
          </div>
          <div
            onClick={async () => {
              const resInJournal = await JournalService.updateJournal(
                Number(id)
              );
              if (resInJournal) {
                setInJournal(!inJournal);
              }
            }}
          >
            {inJournal ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
          </div>
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
              onSubmit={async (values) => {
                
              }}
            >
              <Form className={styles.form}>
                <label htmlFor="context">Write your own review:</label>
                <Field type="text" as="textarea" rows="10" name="context" />
                <ErrorMessage name="context" component="div" />
                <button type="submit" className="greenBtn">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NovelPage;
