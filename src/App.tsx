import React from "react";
import "./styles/globals.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import {
  Login,
  Registration,
  NotFound,
  Profile,
  Journal,
  Main,
  NovelPage,
  AddNovel,
} from "./pages";
import { observer } from "mobx-react-lite";
import authStore from "./store/authStore";

function App() {
  React.useEffect(() => {
    //TODO: refresh token on load
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />

          {!authStore.loggedInStatus ? (
            <>
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
            </>
          ) : (
            <>
              <Route path="login" element={<Navigate to="/" />} />
              <Route path="registration" element={<Navigate to="/" />} />
            </>
          )}
          <Route path="novel/:id" element={<NovelPage />} />
          <Route path="novel/add" element={<AddNovel />} />
          <Route path="u">
            <Route path=":username">
              <Route path='' element={<Profile />} />
              <Route path="journal" element={<Journal />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);
