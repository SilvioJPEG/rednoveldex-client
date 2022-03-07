import { Button, IconButton, InputBase } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { $api } from "../../services/auth.service";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import styles from "../../styles/NovelPage.module.scss";
const FindNovelPage: React.FC = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async (values) => {
      let res = await $api.post(`/novels/find/${values.title}`);
      if (res.data.id) {
        navigate(`/novel/${res.data.id}`);
      }
    },
  });
  return (
    <form className={styles.addForm} onSubmit={formik.handleSubmit}>
      <InputBase
        id="title"
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        placeholder={"Add title by finding it on VNDB..."}
        autoComplete="off"
        sx={{color: "var(--text-color)", fontSize: "32px", width: '100%' }}
      />
      <IconButton type="submit">
        <FindInPageIcon fontSize="large" />
      </IconButton>
    </form>
  );
};

export default FindNovelPage;
