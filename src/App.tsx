import React from "react";
import "./styles/globals.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  ListsPage,
  CreateListPage,
} from "./pages";
import { observer } from "mobx-react-lite";
import authStore from "./store/authStore";
import UsersService from "./services/user.service";
import { blueGrey, deepOrange } from "@mui/material/colors";
import Sidebar from "./components/Sidebar";
import Cookies from "js-cookie";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[400],
    },
  },
});

function App() {
  const getCurrentUserProfile = async () => {
    const username = Cookies.get("signed_as");
    if (username) {
      await UsersService.getLoggedInProfileData(username);
    }
  };
  React.useEffect(() => {
    if (!authStore.loggedInStatus) {
      getCurrentUserProfile();
    }
  }, []);

  return (
    <ThemeProvider theme={outerTheme}>
      <Header />
      <Grid container>
        <Grid item xs={3}>
          {authStore.loggedInStatus && <Sidebar />}
        </Grid>
        <Grid item xs={6}>
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
                  <Route path="" element={<Profile />} />
                  <Route path="journal" element={<Journal />} />
                </Route>
              </Route>
              <Route path="/list/new" element={<CreateListPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default observer(App);
