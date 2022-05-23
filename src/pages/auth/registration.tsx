import { Formik, Form, Field, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import styles from "../../styles/Login.module.scss";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import AuthService from "../../api/auth.service";
interface createAccountDto {
  username: string;
  password: string;
}

const Registration: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
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
          AuthService.registration(values.username, values.password).then(
            () => {
              if (authStore.loggedInStatus) {
                navigate("/", { replace: true });
              } else {
                const errors: any = {};
                errors.password = "Something went wrong, try again";
              }
            }
          );
          setLoading(false);
        }}
      >
        <Form className={styles.form}>
          <h2>Registration</h2>
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
};

export default observer(Registration);
