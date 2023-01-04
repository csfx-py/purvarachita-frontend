import { Box } from "@mui/material";
import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
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
import Err from "./Routes/Err";
import { AdminProvider } from "./Contexts/AdminContext";
import Payment from "./Routes/Payment";
import SinglePost from "./Routes/SinglePost";
import Search from "./Routes/Search";
import AdminPosts from "./Routes/Admin/AdminPosts";
import AdminsTags from "./Routes/Admin/AdminsTags";
import AdminUsers from "./Routes/Admin/AdminUsers";
import UserProfile from "./Routes/UserProfile";

function App() {
  const { loading } = useContext(LoadingContext);
  const { user, userData, role } = useContext(UserContext);

  // get path from url
  const { pathname, state } = useLocation();

  return (
    <>
      {loading && (
        // loading screen absolute position
        <Loading />
      )}
      <div
        className="App"
        style={{
          overflow: loading ? "hidden" : "auto",
          height: loading ? "100vh" : "auto",
        }}
      >
        <FeedProvider userData={userData}>
          <AdminProvider userData={userData}>
            <Box>
              <Nav />
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? (
                      <Navigate to="/community" state={pathname} />
                    ) : (
                      <Home />
                    )
                  }
                />
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
                    user ? (
                      <Profile />
                    ) : (
                      <Navigate to="/auth" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/success/:postId/:sessionId"
                  element={
                    user ? (
                      <Payment conclusion="success" />
                    ) : (
                      <Navigate to="/auth" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/cancel"
                  element={
                    user ? (
                      <Payment conclusion="failure" />
                    ) : (
                      <Navigate to="/auth" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/search"
                  element={
                    user ? <Search /> : <Navigate to="/auth" state={pathname} />
                  }
                />
                <Route
                  path="/profile/:userId"
                  element={
                    user ? (
                      <UserProfile />
                    ) : (
                      <Navigate to="/auth" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/post/:postId"
                  element={
                    user ? (
                      <SinglePost />
                    ) : (
                      <Navigate to="/auth" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/admin/posts"
                  element={
                    role === "admin" ? (
                      <AdminPosts />
                    ) : (
                      <Navigate to="/404" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/admin/tags"
                  element={
                    role === "admin" ? (
                      <AdminsTags />
                    ) : (
                      <Navigate to="/404" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    role === "admin" ? (
                      <AdminUsers />
                    ) : (
                      <Navigate to="/404" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/build"
                  element={
                    user ? (
                      <Builder />
                    ) : (
                      <Navigate to="/auth" state={pathname} />
                    )
                  }
                />
                <Route path="*" element={<Err />} />
              </Routes>
            </Box>
          </AdminProvider>
        </FeedProvider>
      </div>
    </>
  );
}

export default App;
