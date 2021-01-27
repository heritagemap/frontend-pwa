import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Map from 'components/Map';
import DefaultMap from 'components/DefaultMap';
import Sidebar from 'components/Sidebar';
import MonumentPage from 'components/MonumentPage';

import './App.scss';

const App = () => (
  <Router>
    <main>
      <Switch>
        <Route path="/moscow">
          <Redirect to="/lat/55.744654/lon/37.624991" />
        </Route>

        <Route path="/nizhny-novgorod">
          <Redirect to="/lat/56.301011/lon/43.995229" />
        </Route>

        <Route path="/lat/:lat/lon/:lon/:id?">
          <Map />
          <Sidebar />
        </Route>

        <Route path="/:id">
          <MonumentPage />
        </Route>

        <Route exact path="/">
          <DefaultMap />
        </Route>
      </Switch>
    </main>
  </Router>
);

export default App;
