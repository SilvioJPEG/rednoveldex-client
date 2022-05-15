import { Formik, Field } from "formik";
import styles from "../../styles/CreateList.module.scss";
import React from "react";
import { Button } from "@mui/material";
import ListsService from "../../api/lists.service";
import NovelsService from "../../api/novels.service";
import { BaseNovel } from "../../typings/models";
import ClearIcon from "@mui/icons-material/Clear";

const initialValues = {
  name: "",
  description: "",
};
const CreateListPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<null | BaseNovel[]>(
    null
  );
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [list, setList] = React.useState<BaseNovel[]>([]);

  const onChangeSearch = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
    if (value.length) {
      let data = await NovelsService.searchFor(event.currentTarget.value);
      data = data.filter((novel: BaseNovel) => {
        return !list.some((el: BaseNovel) => el.title === novel.title);
      });
      setSearchResults(data);
    } else {
      setSearchResults(null);
    }
  };

  const addToList = (novel: BaseNovel) => {
    if (!list.some((el: BaseNovel) => el.id === novel.id)) {
      setList([...list, novel]);
    }
    setSearchValue("");
    setSearchResults(null);
  };

  const deleteFromList = (novel: BaseNovel) => {
    setList(list.filter((item: BaseNovel) => item !== novel));
  };
  return (
    <article>
      <h1>New List</h1>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        onSubmit={(values) => {
          let ids = list.map((novel) => novel.id);
          let definedIds: number[] = [];
          ids.forEach((id) => {
            if (id !== undefined) definedIds.push(id);
          });
          const createListDto = {
            name: values.name,
            description: values.description,
            novels: definedIds,
          };
          ListsService.create(createListDto);
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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

                <div className={styles.searchNovel}>
                  <input type="text" onChange={(e) => onChangeSearch(e)} />
                </div>

                {searchResults && (
                  <div className={styles.dropdown__results}>
                    {searchResults.map((result: BaseNovel) => (
                      <span
                        key={result.id}
                        onClick={() => addToList(result)}
                        className={styles.result}
                      >
                        {result.title}
                      </span>
                    ))}
                  </div>
                )}
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
        )}
      </Formik>
      <div className={styles.listPreview}>
        {list.map((novel: BaseNovel, index) => (
          <div
            key={novel.id}
            className={styles.listPreview__item}
            style={list.length - 1 === index ? { borderBottom: 0 } : {}}
          >
            <div className={styles.novelInfo}>
              <img src={novel.image} alt={novel.title} />
              <span>{novel.title}</span>
            </div>

            <span onClick={() => deleteFromList(novel)}>
              <ClearIcon
                className={styles.clearIcon}
                sx={{ "&:hover": { color: "red" } }}
              />
            </span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CreateListPage;
