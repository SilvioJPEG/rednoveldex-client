import React from "react";
import { Formik, Field } from "formik";
import styles from "../../styles/Journal.module.scss";
import { JournalEntry } from "../../types/models";
import Button from "@mui/material/Button";
import authStore from "../../store/authStore";
import JournalService from "../../services/journal.service";
import { DatePickerField, SelectField } from "../../components/Fields";

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
  entry: JournalEntry;
  replaceEntity: (data: JournalEntry) => void;
};

const scores = [
  { value: 0, label: "Select score" },
  { value: 10, label: "(10) Masterpiece" },
  { value: 9, label: "(9) Great" },
  { value: 8, label: "(8) Very good" },
  { value: 7, label: "(7) Good" },
  { value: 6, label: "(6) Fine" },
  { value: 5, label: "(5) Average" },
  { value: 4, label: "(4) Bad" },
  { value: 3, label: "(3) Very bad" },
  { value: 2, label: "(2) Horrible" },
  { value: 1, label: "(1) Appalling" },
];
const statuses = [
  { value: "reading", label: "Reading" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On-hold" },
  { value: "dropped", label: "Dropped" },
  { value: "plan to read", label: "Plan to Read" },
];

const EditPopup: React.FC<EditPopupProps> = ({
  editOpen,
  setEditOpen,
  entry,
  replaceEntity,
}) => {
  const editInitialValues = {
    status: entry.status,
    score: entry.score,
    startDate: entry.started_reading ? new Date(entry.started_reading) : null,
    finishDate: entry.finished_reading
      ? new Date(entry.finished_reading)
      : null,
    comments: entry.comments,
  };

  const popupRef = React.useRef(null);
  useOutsideAlerter(popupRef, setEditOpen);
  return (
    <>
      {editOpen && (
        <div
          data-testid="overlay"
          data-popup="modal"
          className="popup-overlay"
          tabIndex={-1}
        >
          <div className="popup-content" role="dialog" ref={popupRef}>
            <Formik
              initialValues={editInitialValues}
              onSubmit={async (values) => {
                if (!authStore.loggedInStatus) return;
                const updatedData = {
                  status: values.status,
                  score: values.score,
                  started_reading: values.startDate?.valueOf(),
                  finished_reading: values.finishDate?.valueOf(),
                };
                const newEntity = await JournalService.updateJournalEntity(
                  entry.Novel.id,
                  updatedData
                );
                replaceEntity(newEntity);
                setEditOpen(false);
              }}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <form className={styles.editForm} onSubmit={handleSubmit}>
                  <h2>Editing {entry?.Novel.title}</h2>
                  <div className={styles.fieldWrapper}>
                    <label htmlFor="status">Status</label>
                    <SelectField
                      options={statuses}
                      name="status"
                      defaultValue={values.status}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label htmlFor="score">Score</label>
                    <SelectField
                      options={scores}
                      name="score"
                      defaultValue={values.score}
                    />
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
      )}
    </>
  );
};
export default EditPopup;
