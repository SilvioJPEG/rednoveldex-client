import React from "react";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import { useParams } from "react-router";
import NovelWrapper from "../components/NovelWrapper";
import { JournalEntry } from "../types/models";
import PendingIcon from "@mui/icons-material/Pending";
import styles from "../styles/Journal.module.scss";
import journalService from "../services/journal.service";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import CircularProgress from "@mui/material/CircularProgress";
import authStore from "../store/authStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";

type editValuesType = {
  status: string;
  score: number;
  startDate: Date;
  finishDate: Date;
};
const editInitialValues = {
  status: "",
  score: 0,
  startDate: new Date(),
  finishDate: new Date(),
};
function EmptyJournal() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PendingIcon />
      <span>There is nothing here right now...</span>
    </div>
  );
}

type DatePickerProps = {
  name: string;
  value: Date;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};
export const DatePickerField: React.FC<DatePickerProps> = ({
  name,
  value,
  setFieldValue,
}) => {
  return (
    <DatePicker
      className={"date-picker"}
      selected={(value && new Date(value)) || null}
      onChange={(val) => {
        setFieldValue(name, val);
      }}
    />
  );
};
function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  setEditOpen: (data: boolean) => void
) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setEditOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
type EditPopupProps = {
  editOpen: boolean;
  setEditOpen: (data: boolean) => void;
  entry: JournalEntry | null;
};
const EditPopup: React.FC<EditPopupProps> = ({
  editOpen,
  setEditOpen,
  entry,
}) => {
  const popupRef = React.useRef(null);
  useOutsideAlerter(popupRef, setEditOpen);
  return (
    <>
      <div
        data-testid="overlay"
        data-popup="modal"
        className="popup-overlay"
        tabIndex={-1}
        style={!editOpen ? { display: "none" } : {}}
      >
        <div className="popup-content" role="dialog" ref={popupRef}>
          <Formik
            initialValues={editInitialValues}
            validate={(values) => {
              const errors: any = {};
              return errors;
            }}
            onSubmit={async (values) => {
              if (!authStore.loggedInStatus) return;
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <form className={styles.editForm} onSubmit={handleSubmit}>
                <h2>Editing {entry?.title}</h2>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="status">Status</label>
                  <Field name="status" />
                </div>

                <div className={styles.fieldWrapper}>
                  <label htmlFor="score">Score</label>
                  <Field name="score" />
                </div>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="startDate">Started Date</label>
                  <DatePickerField
                    name="startDate"
                    value={values.startDate}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="finishedDate">Finished Date</label>
                  <DatePickerField
                    name="finishDate"
                    value={values.finishDate}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <Button type="submit" variant="contained" color="success">
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
const Journal: React.FC = () => {
  const { username } = useParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [journalList, setJournal] = React.useState<JournalEntry[] | null>(null);
  const [editData, setEditData] = React.useState<JournalEntry | null>(null);
  const [editOpen, setEditOpen] = React.useState<boolean>(false);
  const getJournalData = async () => {
    if (username) {
      const journalData = await journalService.getJournalEntities(username);
      setJournal(journalData);
    }
  };
  React.useEffect(() => {
    getJournalData();
  }, []);
  return (
    <div className={styles.journal}>
      <h1>{username}'s journal</h1>
      {journalList === null ? (
        <CircularProgress />
      ) : journalList.length !== 0 ? (
        <table className={styles.table}>
          <tbody>
            <tr className={styles.table__row}>
              <td>#</td>
              <td>Image</td>
              <td>Title</td>
              <td>Score</td>
              <td>Status</td>
              {username === authStore.user.username && <td></td>}
            </tr>
            {journalList.map((novel, index) => (
              <tr
                key={novel.id}
                className={styles.table__row}
                style={
                  index % 2
                    ? { backgroundColor: "var(--secondary-background-color)" }
                    : {}
                }
              >
                <td>{index}</td>
                <td>
                  <NovelWrapper key={novel.id} novel={novel} type={"tiny"} />
                </td>
                <td>
                  <Link className={styles.link} to={`/novel/${novel.id}`}>
                    {novel.title}
                  </Link>
                </td>
                <td>{novel.score ?? "0"}</td>
                <td>{novel.status ?? "Reading"}</td>
                {(username === authStore.user.username) && (
                  <td>
                    <span
                      className={styles.link}
                      onClick={() => {
                        setEditOpen(!editOpen);
                        setEditData(novel);
                      }}
                    >Edit</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        EmptyJournal()
      )}
      <EditPopup
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        entry={editData}
      />
    </div>
  );
};
export default Journal;
