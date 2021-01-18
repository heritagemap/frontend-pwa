import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Map from 'components/Map';
import DefaultMap from 'components/DefaultMap';
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
          <DefaultMap />
        </Route>
      </Switch>
    </main>
  </Router>
);

export default App;
