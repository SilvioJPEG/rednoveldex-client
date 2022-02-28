import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import styles from "../../styles/Login.module.scss";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";

interface valuesInterface {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  return (
    <div className={styles.loginWrapper}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values: valuesInterface) => {
          const errors: any = {};
          if (!values.username) {
            errors.username = "Required";
          }
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
          // ) {
          //   errors.username = "Invalid email address";
          // }
          return errors;
        }}
        onSubmit={(values) => {
          authStore.login(values.username, values.password);
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
