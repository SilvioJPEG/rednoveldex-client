import React from "react";
import { Formik, Field } from "formik";
import Select from "react-select";
import styles from "../../styles/Journal.module.scss";
import DatePicker from "react-datepicker";
import { JournalEntry } from "../../types/models";
import Button from "@mui/material/Button";
import authStore from "../../store/authStore";

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
const editInitialValues = {
  status: "",
  score: 0,
  startDate: new Date(),
  finishDate: new Date(),
};
const scores = [
  { value: 1, label: "(10) Masterpiece" },
  { value: 2, label: "(9) Great" },
  { value: 3, label: "(8) Very good" },
  { value: 4, label: "(7) Good" },
  { value: 5, label: "(6) Fine" },
  { value: 6, label: "(5) Average" },
  { value: 7, label: "(4) Bad" },
  { value: 8, label: "(3) Very bad" },
  { value: 9, label: "(2) Horrible" },
  { value: 10, label: "(1) Appalling" },
];
const statuses = [
  { value: "Reading", label: "Reading" },
  { value: "Completed", label: "Completed" },
  { value: "On-hold", label: "On-hold" },
  { value: "Dropped", label: "Dropped" },
];

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
                <h2>Editing {entry?.Novel.title}</h2>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="status">Status</label>
                  <Select
                    name="status"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "var(--input-hover-color)",
                        primary: "var(--orange-border)",
                        neutral0: "var(--input-background-color)",
                        primary50: "var(--input-hover-color)",
                        neutral80: "var(--text-color)",
                      },
                    })}
                    options={statuses}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label htmlFor="score">Score</label>
                  <Select
                    name="score"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "var(--input-hover-color)",
                        primary: "var(--orange-border)",
                        neutral0: "var(--input-background-color)",
                        primary50: "var(--input-hover-color)",
                        neutral80: "var(--text-color)",
                      },
                    })}
                    options={scores}
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
    </>
  );
};
export default EditPopup;
