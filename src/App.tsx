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
import RedirectWithZoom from 'components/RedirectWithZoom';
import shortLinks from 'constants/shortLinks';
import LinkInterface from 'interfaces/Link';

import './App.scss';

const App = () => (
  <Router>
    <main>
      <Switch>
        {shortLinks.map((link: LinkInterface) => (
          <Route path={link.path}>
            <Redirect to={link.to} />
          </Route>
        ))}
        <Route path="/lat/:lat/lon/:lon/zoom/:zoom/:id?">
          <Map />
          <Sidebar />
        </Route>

        <Route path="/lat/:lat/lon/:lon/:id?">
          <RedirectWithZoom />
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
