import React from "react";
import { Field, Form, Formik } from "formik";
import { UserData } from "../typings/models";
import "../styles/Settings.scss";

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
    <section className="container">
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
          <Form className="settings">
            <h2 className="settings__header sectionHeading">
              <span>Settings</span>
              <button type="submit">Save</button>
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
