import { Formik, Form, Field, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import styles from "../../styles/Login.module.scss";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
interface createAccountDto {
  username: string;
  password: string;
}

const Registration: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  React.useEffect(() => {}, []);
  return (
    <div className={styles.loginWrapper}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values: createAccountDto) => {
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
          setLoading(true);
          const status = await authStore.register(
            values.username,
            values.password
          );
          if (status === 200 && authStore.loggedInStatus) {
            setLoading(false);
            if (!loading) navigate("/");
          }
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
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={loading}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default observer(Registration);
