import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import styles from "../../styles/Login.module.scss";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import { useLocation, useNavigate } from "react-router";

interface valuesInterface {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.loginWrapper}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values: valuesInterface) => {
          const errors: any = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (authStore.loggedInStatus) return;
          const status = await authStore.login(
            values.username,
            values.password
          );
          if (status === 200) navigate("/");
        }}
      >
        <Form className={styles.form}>
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
export default observer(LoginPage);
