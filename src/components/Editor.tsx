import React from "react";
import { Formik } from "formik";
import "../styles/Editor.scss";
import { EditorEntityValues, JournalEntry } from "../typings/models";
import Button from "@mui/material/Button";
import authStore from "../store/authStore";
import JournalService from "../api/journal.service";
import { DatePickerField, SelectField } from "../components/Fields";
import editorStore from "../store/editorStore";
import { observer } from "mobx-react-lite";
import { scores, statuses } from "../typings/editor";

function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        editorStore.closeEditor();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
type EditPopupProps = {
  replaceEntity: (data: JournalEntry) => void;
};

const EditPopup: React.FC<EditPopupProps> = ({ replaceEntity }) => {
  const popupRef = React.useRef(null);
  useOutsideAlerter(popupRef);
  return (
    <>
      {editorStore.opened && (
        <div className="popup__overlay" tabIndex={-1}>
          <div className="popup__content" role="dialog" ref={popupRef}>
            <Formik
              initialValues={editorStore.getInitialValues()}
              validate={(values: EditorEntityValues) => {
                const errors: any = {};
                if (!values.status) {
                  errors.status = "status is required";
                }
              }}
              onSubmit={async (values) => {
                if (!authStore.loggedInStatus) return;
                const updatedData = {
                  status: values.status,
                  score: values.score,
                  started_reading: values.startDate?.valueOf(),
                  finished_reading: values.finishDate?.valueOf(),
                };
                if (editorStore.entity) {
                  const newEntity = await JournalService.updateJournalEntity(
                    editorStore.entity.Novel.id,
                    updatedData
                  );
                  replaceEntity(newEntity);
                  editorStore.closeEditor();
                }
              }}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <form className="editForm" onSubmit={handleSubmit}>
                  <div className="editForm__header">
                    {editorStore.entity && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "10px",
                        }}
                      >
                        <img
                          src={editorStore.entity.Novel.image}
                          alt={editorStore.entity.Novel.title}
                        />
                        <span>{editorStore.entity.Novel.title}</span>
                      </div>
                    )}
                    {editorStore.baseNovelInfo && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "10px",
                        }}
                      >
                        <img
                          src={editorStore.baseNovelInfo.image}
                          alt={editorStore.baseNovelInfo.title}
                        />
                        <span>{editorStore.baseNovelInfo.title}</span>
                      </div>
                    )}
                    <Button type="submit" variant="contained" color="success">
                      Save
                    </Button>
                  </div>

                  <div className="editForm__row">
                    <div className="fieldWrapper">
                      <label htmlFor="status">Status</label>
                      <SelectField
                        options={statuses}
                        name="status"
                        defaultValue={values.status}
                      />
                    </div>

                    <div className="fieldWrapper">
                      <label htmlFor="score">Score</label>
                      <SelectField
                        options={scores}
                        name="score"
                        defaultValue={values.score}
                      />
                    </div>
                  </div>

                  <div className="editForm__row">
                    <div className="fieldWrapper">
                      <label htmlFor="startDate">Started Date</label>
                      <DatePickerField
                        name="startDate"
                        value={values.startDate}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div className="fieldWrapper">
                      <label htmlFor="finishedDate">Finished Date</label>
                      <DatePickerField
                        name="finishDate"
                        value={values.finishDate}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                  {editorStore.type === "edit" && (
                    <button
                      className="deleteBtn"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Delete
                    </button>
                  )}
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};
export default observer(EditPopup);
