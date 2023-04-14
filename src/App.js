// App.js

import React from 'react';
import {Routes, Route } from 'react-router-dom';
import SignUp from './Component/SignUp';
import Home from './Component/Home';
import SignIn from './Component/SignIn';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
    </div>
  );
}

export default App;
