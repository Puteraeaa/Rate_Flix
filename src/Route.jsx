import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Page/HomeComponent';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      
    </Router>
  );
}

export default App;
