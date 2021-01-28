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

import { DEFAULT_ZOOM } from 'constants/map';

import './App.scss';

const App = () => (
  <Router>
    <main>
      <Switch>
        <Route path="/moscow">
          <Redirect to={`/lat/55.744654/lon/37.624991/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/nizhny-novgorod">
          <Redirect to={`/lat/56.301011/lon/43.995229/zoom/${DEFAULT_ZOOM}`} />
        </Route>


        <Route path="/arzamas">
          <Redirect to={`/lat/55.386373/lon/43.817099/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/balakhna">
          <Redirect to={`/lat/56.492938/lon/43.611212/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/bogorodsk">
          <Redirect to={`/lat/56.101523/lon/43.516550/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/bolshoe-murashkino">
          <Redirect to={`/lat/55.781787/lon/44.774134/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/vyksa">
          <Redirect to={`/lat/55.318686/lon/42.186628/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/gorbatov">
          <Redirect to={`/lat/56.131309/lon/43.058318/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/lyskovo">
          <Redirect to={`/lat/56.037971/lon/45.0478428/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/gorodets">
          <Redirect to={`/lat/56.644823/lon/43.469353/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/dzerzhinsk">
          <Redirect to={`/lat/56.238716/lon/43.461149/zoom/${DEFAULT_ZOOM}`} />
        </Route>

        <Route path="/pavlovo">
          <Redirect to={`/lat/55.963602/lon/43.070018/zoom/${DEFAULT_ZOOM}`} />
        </Route>

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
