import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Page/HomeComponent';
import Film from './Page/FilmCompenent';
import Second from './Page/AboutComponent';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/film/:id" element={<Film />} />
        <Route exact path="/about" element={<Second />} />
      </Routes>
    </Router>
  );
}

export default App;
