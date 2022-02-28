import { Formik, Form, Field, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import styles from "../../styles/Login.module.scss";
import authStore from "../../store/authStore";
interface valuesInterface {
  username: string;
  password: string;
}

const RegistrationPage: React.FC = () => {
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  React.useEffect(() => {}, []);
  return (
    <div className={styles.loginWrapper}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values: valuesInterface) => {
          const errors: any = {};
          if (!values.username) {
            errors.username = "Required";
          }
          return errors;
        }}
        onSubmit={(values) => {
          authStore.register(values.username, values.password);
        }}
      >
        <Form className={styles.form}>
          <div>Join novelboxd</div>
          <label htmlFor="username">Username</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" />
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" className="greenBtn" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default observer(RegistrationPage);
