import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CauseDetails from './pages/CauseDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import CreateCause from './pages/CreateCause';
import SearchCause from './pages/SearchCause';
import Donations from './pages/Donations';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/SideBar';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();
  const noSidebarRoutes = ["/login", "/signup", "/"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div style={styles.container}>
      {showSidebar && <Sidebar />}
      <div style={showSidebar ? styles.contentWithSidebar : styles.contentWithoutSidebar}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/cause/:id" element={<CauseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/create-cause" element={<PrivateRoute element={<CreateCause />} />} />
          <Route path="/search-cause" element={<PrivateRoute element={<SearchCause />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/donations" element={<Donations />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },
  contentWithSidebar: {
    marginLeft: "60px", 
    padding: "2rem",
    width: "100%",
  },
  contentWithoutSidebar: {
    width: "100%",
    padding: "2rem",
  },
};

export default App;
