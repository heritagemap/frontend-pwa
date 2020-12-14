import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Map from 'components/Map';
import Sidebar from 'components/Sidebar';

import './App.scss';

const App = () => (
  <Router>
    <main>
      <Switch>
        <Route path="/lat/:lat/lon/:lon/:id?">
          <Map />
          <Sidebar />
        </Route>

        <Route exact path="/">
          <Redirect to="/lat/55.7522/lon/37.6155" />
        </Route>
      </Switch>
    </main>
  </Router>
);

export default App;
