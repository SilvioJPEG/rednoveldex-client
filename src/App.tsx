import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles/globals.scss";
import LoginPage from "./pages/auth/login";
import RegistrationPage from "./pages/auth/registration";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Main from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/:username" element={<Profile userData={{
          username: "",
          avatar: "",
          favourites: []
        }} />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
