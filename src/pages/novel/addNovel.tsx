import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../../styles/NovelPage.module.scss";
import { $api } from "../../services/auth.service";

interface valuesInterface {
  title: string;
}

const AddNovel: React.FC = () => {
  return (
    <div className={styles.addNovelWrapper}>
      <Formik
        initialValues={{ title: "", description: "", date: Date.now() }}
        validate={(values: valuesInterface) => {
          const errors: any = {};
          if (!values.title) {
            errors.title = "Required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          const res = await $api.post(`/novels/add`, values);
          console.log(res);
        }}
      >
        <Form>
          <div>Add new novel</div>

          <label htmlFor="title">Title</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />

          <label htmlFor="description">description</label>
          <Field type="textarea" name="description" />
          <ErrorMessage name="description" component="div" />

          <label htmlFor="release">Release date</label>
          <Field type="date" name="release" />
          <ErrorMessage name="release" component="div" />

          <button type="submit" className="greenBtn">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default AddNovel;
