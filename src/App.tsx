import React from "react";
import "./styles/globals.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Header from "./components/Header";
import * as pages from "./pages";
import { observer } from "mobx-react-lite";
import authStore from "./store/authStore";
import UsersService from "./api/user.service";
import Cookies from "js-cookie";

const addBodyClass = (className: string) =>
  document.body.classList.add(className);
const removeBodyClass = (className: string) =>
  document.body.classList.remove(className);

function App() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  const getLoggedInUserData = async () => {
    const username = Cookies.get("signed_as");
    if (username) {
      await UsersService.getLoggedInData(username);
    }
  };
  React.useEffect(() => {
    if (!authStore.loggedInStatus) {
      getLoggedInUserData();
    }
  }, []);

  return (
    <div className={"appWrapper"}>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/">
            <Route index element={<pages.Main />} />

            {!authStore.loggedInStatus ? (
              <>
                <Route path="login" element={<pages.Login />} />
                <Route path="registration" element={<pages.Registration />} />
              </>
            ) : (
              <>
                <Route path="lists">
                  <Route path="new" element={<pages.CreateListPage />} />
                </Route>
                <Route
                  path="settings"
                  element={<pages.Settings user={authStore.user} />}
                />
                <Route path="login" element={<Navigate to="/" />} />
                <Route path="registration" element={<Navigate to="/" />} />
              </>
            )}
            <Route path="novel/:id" element={<pages.NovelPage />} />
            <Route path="novel/add" element={<pages.FindNovelPage />} />
            <Route path="u">
              <Route path=":username">
                <Route path="" element={<pages.Profile />} />
                <Route path="journal" element={<pages.Journal />} />
                <Route path="lists" element={<pages.ListsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<pages.NotFound />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default observer(App);
