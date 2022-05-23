import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import styles from "../../styles/Login.module.scss";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import AuthService from "../../api/auth.service";

interface valuesInterface {
  username: string;
  password: string;
}

const LoginPage: React.FC = observer(() => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
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
          setLoading(true);
          AuthService.login(values.username, values.password);
          if (authStore.loggedInStatus) {
            setLoading(false);
            navigate("/", { replace: true });
          } else {
            setLoading(false);
            const errors: any = {};
            errors.password = "Wrong username or password";
            return errors;
          }
        }}
      >
        <Form className={styles.form}>
          <h2>Login</h2>
          <div>
            <Field type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>

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
});
export default LoginPage;
