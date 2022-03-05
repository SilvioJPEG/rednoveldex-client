import React from "react";
import "./styles/globals.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
  ListsPage
} from "./pages";
import { observer } from "mobx-react-lite";
import authStore from "./store/authStore";
import { blueGrey, deepOrange } from "@mui/material/colors";
import Sidebar from "./components/Sidebar";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[400],
    },
    secondary: deepOrange,
  },
});

function App() {
  React.useEffect(() => {
    //TODO: refresh token on load
  }, []);

  return (
    <ThemeProvider theme={outerTheme}>
      <Header />
      <Grid container>
        <Grid item xs={3}>
          <Sidebar />
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
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Grid>

      </Grid>
    </ThemeProvider>
  );
}

export default observer(App);
