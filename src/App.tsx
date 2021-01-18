import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Map from 'components/Map';
import Sidebar from 'components/Sidebar';

import './App.scss';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.hostname === '/') {
      navigator.geolocation.getCurrentPosition((position) => {
        if (
          !position.coords
          || !position.coords.latitude
          || !position.coords.longitude
        ) {
          return;
        }

        const { longitude, latitude } = position.coords;

        history.push(`/lat/${latitude}/lon/${longitude}`);
      });
    }
  });
  return (
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
};

export default App;
