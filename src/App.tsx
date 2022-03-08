import React from "react";
import "./styles/globals.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Header from "./components/Header";
import {
  Login,
  Registration,
  NotFound,
  Profile,
  Journal,
  Main,
  NovelPage,
  ListsPage,
  CreateListPage,
  FindNovelPage,
} from "./pages";
import { observer } from "mobx-react-lite";
import authStore from "./store/authStore";
import UsersService from "./services/user.service";
import Sidebar from "./components/Sidebar";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material";

function App() {
  const theme = useTheme();
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
    <div className={"appWrapper " + theme.palette.mode}>
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
              <Route path="novel/add" element={<FindNovelPage />} />
              <Route path="u">
                <Route path=":username">
                  <Route path="" element={<Profile />} />
                  <Route path="journal" element={<Journal />} />
                  <Route path="lists" element={<ListsPage />} />
                </Route>
              </Route>
              <Route path="/list/new" element={<CreateListPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(App);
