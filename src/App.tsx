import React from "react";
import "./styles/globals.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import * as pages from "./pages";
import { observer } from "mobx-react-lite";
import authStore from "./store/authStore";
import UsersService from "./api/user.service";
import Cookies from "js-cookie";

const addBodyClass = (className: string) =>
  document.body.classList.add(className);
const removeBodyClass = (className: string) =>
  document.body.classList.remove(className);

function RequireLogout({ children }: { children: JSX.Element }) {
  let location = useLocation();
  if (authStore.loggedInStatus) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  if (!authStore.loggedInStatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const replaceThemeTo = (newTheme: "dark" | "light") => {
    if (
      (newTheme === "dark" && theme === "light") ||
      (newTheme === "light" && theme === "dark")
    ) {
      removeBodyClass(theme);
      addBodyClass(newTheme);
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    }
  };
  const getLoggedInUserData = async () => {
    const username = Cookies.get("signed_as");
    if (username) {
      await UsersService.getLoggedInData(username);
    }
  };
  const getLocalStorageTheme = () => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark" || theme === "light") {
      setTheme(theme);
    } else {
      localStorage.setItem("theme", "dark");
      theme = "dark";
    }
    addBodyClass(theme);
  };
  React.useEffect(() => {
    if (!authStore.loggedInStatus) {
      getLoggedInUserData();
    }
    getLocalStorageTheme();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<pages.Main />} />
            <Route
              path="login"
              element={
                <RequireLogout>
                  <pages.Login />
                </RequireLogout>
              }
            />
            <Route
              path="registration"
              element={
                <RequireLogout>
                  <pages.Registration />
                </RequireLogout>
              }
            />

            <Route path="lists">
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <pages.CreateList />
                  </RequireAuth>
                }
              />
              <Route path=":id" element={<pages.SingleList />} />
            </Route>

            <Route
              path="settings"
              element={
                <RequireAuth>
                  <pages.Settings user={authStore.user} />
                </RequireAuth>
              }
            />

            <Route path="novel">
              <Route path=":id" element={<pages.SingleNovel />} />
              <Route path="add" element={<pages.FindNovel />} />
            </Route>

            <Route path="user">
              <Route path=":username">
                <Route
                  path=""
                  element={<pages.Profile childComp={<pages.ProfileHome />} />}
                />
                <Route
                  path="journal"
                  element={<pages.Profile childComp={<pages.Journal />} />}
                />
                <Route
                  path="lists"
                  element={<pages.Profile childComp={<pages.UsersLists />} />}
                />
              </Route>
            </Route>
          </Route>
          <Route path="about" element={<pages.About />} />
          <Route path="*" element={<pages.NotFound />} />
        </Routes>
      </main>
      <Footer replaceThemeTo={replaceThemeTo} />
    </>
  );
}

export default observer(App);
