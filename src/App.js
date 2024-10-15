import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Message from "./pages/Message";



import Homepage from "./pages/Homepage";





function App() {

  const [authState, setAuthState] = useState({
    username: "", id: 0, status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false })
      } else {
        setAuthState({
          username: response.data.username, id: response.data.id, status: true,
        });
      }
    });
  }, [authState]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        {/* Commenting out the navbar link part
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registrations">Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home Page</Link>
                  <Link to="/createpost">Create A Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <span>{authState.username}</span>
              {authState.status && <button onClick={logout}>Logout</button>}
            </div>
          </div>
        </Router>
        */}
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registrations" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/Message" element={<Message />} />
          
          
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<PageNotFound  />} />
           
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
