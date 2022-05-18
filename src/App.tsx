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
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
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
      <main className="content">
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
            </Route>

            <Route
              path="settings"
              element={
                <RequireAuth>
                  <pages.Settings user={authStore.user} />
                </RequireAuth>
              }
            />
            <Route path="novel/:id" element={<pages.NovelInfo />} />
            <Route path="novel/add" element={<pages.FindNovel />} />
            <Route path="u">
              <Route path=":username">
                <Route path="" element={<pages.Profile />} />
                <Route path="journal" element={<pages.Journal />} />
                <Route path="lists" element={<pages.UsersLists />} />
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
