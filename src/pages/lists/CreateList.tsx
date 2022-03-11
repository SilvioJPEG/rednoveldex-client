import { Formik, Field } from "formik";
import styles from "../../styles/CreateList.module.scss";
import React from "react";
import { Button, Divider, InputBase, Paper } from "@mui/material";
import ListsService from "../../services/lists.service";
import { createListDto } from "../../types/dto";

const initialValues: createListDto = {
  name: "",
  description: "",
  tags: [],
  titles: [],
};
const CreateListPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const searchNovel = () => {};
  return (
    <article>
      <h1>New List</h1>
      <Formik
        initialValues={initialValues}
        validate={(values: createListDto) => {
          const errors: any = {};
          if (!values.name) {
            errors.username = "Required";
          }
          if (!values.titles.length) {
            errors.titles = "List show have at least one novel";
          }
          return errors;
        }}
        onSubmit={(values: createListDto) => {
          ListsService.create(values);
        }}
      >
        <form>
          <div className={styles.formWrapper}>
            <div>
              <div className={styles.inputWrapper}>
                <label htmlFor="name">Name of list</label>
                <Field type="text" name="name" autoComplete="off" />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="tags">Tags</label>
                <Field type="text" name="tags" autoComplete="off" />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="description">Description</label>
              <Field
                type="text"
                component="textarea"
                rows="7"
                name="description"
                autoComplete="off"
              />
            </div>
          </div>
          <div className={styles.formWrapper__footer}>
            <div className={styles.searchWrapper}>
              <label htmlFor="search">Search for novels to add</label>
              <Paper
                id="search"
                sx={{
                  backgroundColor: "var(--input-background-color)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button color="success">Add</Button>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                  sx={{
                    color: "var(--text-color)",
                    borderBottom: "1px solid var(--input-text-color)",
                    borderRadius: "4px",
                    padding: "5px 10px",
                  }}
                  onChange={() => searchNovel()}
                />
              </Paper>
            </div>
            <Button
              type="submit"
              color="success"
              variant="contained"
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </form>
      </Formik>
      <div className={styles.listItems}></div>
    </article>
  );
};

export default CreateListPage;
