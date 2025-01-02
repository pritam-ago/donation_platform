import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CauseDetails from './pages/CauseDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path='/cause/:id' element={<CauseDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup'element={<Signup/>} />
        <Route path='/home' element={<PrivateRoute element={<Home/>} />} />
      </Routes>
    </Router>
  );
}

export default App;