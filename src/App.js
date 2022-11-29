import { Box } from "@mui/material";
import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
// import Err404 from "./Components/Err404";
import Loading from "./Components/Loading";
import Nav from "./Components/Nav";
import { FeedProvider } from "./Contexts/FeedContext";
import { LoadingContext } from "./Contexts/LoadingContext";
import { UserContext } from "./Contexts/UserContext";
import Auth from "./Routes/Auth";
import Feed from "./Routes/Feed";
import Home from "./Routes/Home";
import Profile from "./Routes/Profile";
import Builder from "./Routes/Builder";

function App() {
  const { loading } = useContext(LoadingContext);
  const { user, userData } = useContext(UserContext);

  // get path from url
  const { pathname, state } = useLocation();

  return (
    <div className="App">
      {loading && (
        // loading screen absolute position
        <Loading />
      )}
      <FeedProvider userData={userData}>
        <Box>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth"
              element={user ? <Navigate to={state} /> : <Auth />}
            />
            <Route
              path="/community"
              element={
                user ? <Feed /> : <Navigate to="/auth" state={pathname} />
              }
            />
            <Route
              path="/profile"
              element={
                user ? <Profile /> : <Navigate to="/auth" state={pathname} />
              }
            />
            <Route
              path="/build"
              element={
                user ? <Builder /> : <Navigate to="/auth" state={pathname} />
              }
            />
            {/* <Route path="*" element={<Err404 />} /> */}
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Box>
      </FeedProvider>
    </div>
  );
}

export default App;
