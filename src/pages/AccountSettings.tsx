import React from "react";
import { Field, Form, Formik } from "formik";
import { UserData } from "../typings/models";
import Button from "@mui/material/Button";

type ProfileSettingsProps = {
  user: UserData;
};
type InputProps = {
  field: any;
  values: any;
};
const InputWithLength = ({ field, values, ...props }: InputProps) => {
  return (
    <div>
      <span>{values}</span>
      <input {...field} {...props} />
    </div>
  );
};
const Settings: React.FC<ProfileSettingsProps> = ({ user }) => {
  return (
    <section>
      <Formik
        initialValues={{ location: "", bio: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ values }) => (
          <Form>
            <h2 className="accountHeader sectionHeading">
              <span>Settings</span>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </h2>
            <div className="fieldWrapper">
              <label htmlFor="location">Location</label>
              <Field type="textarea" name="location" />
            </div>
            <div className="fieldWrapper">
              <label htmlFor="bio">Bio</label>
              <Field type="text" name="bio" component={InputWithLength}></Field>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Settings;
