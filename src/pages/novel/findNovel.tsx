import { IconButton, InputBase } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import styles from "../../styles/NovelPage.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import NovelsService from "../../services/novels.service";

const FindNovelPage: React.FC = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [results, setResults] = React.useState<string[] | null>(null);
  const addNovel = async (title: string) => {
    let data = await NovelsService.addNovel(title);
    if (data.id) {
      navigate(`/novel/${data.id}`);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validate: (values) => {
      const errors: { title?: string } = {};
      if (values.title.length === 0) {
        errors.title = "Required";
      }
      return errors;
    },
    onSubmit: async (values, actions) => {
      if (!loading) {
        setLoading(true);
        actions.setSubmitting(false);
        const novels = await NovelsService.findNovelInVNDB(values.title);
        if (novels) {
          setResults(novels);
        }
        setLoading(false);
      }
    },
  });
  return (
    <div className={styles.addFormWrapper}>
      <form
        className={styles.addForm}
        onChange={() => setResults(null)}
        onSubmit={formik.handleSubmit}
      >
        <InputBase
          id="title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder={"Add title by finding it on VNDB..."}
          autoComplete="off"
          sx={{
            color: "var(--text-color)",
            fontSize: "32px",
            width: "100%",
            boxShadow: "0",
          }}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <IconButton type="submit">
            <FindInPageIcon
              fontSize="large"
              sx={{ color: "var(--text-color)" }}
            />
          </IconButton>
        )}
      </form>
      {results && (
        <ul className={styles.results}>
          {results.map((title) => (
            <li key={title} onClick={() => addNovel(title)}>
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindNovelPage;
