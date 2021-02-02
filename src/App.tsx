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
          <Redirect to={`/lat/55.744654/lon/37.624991/zoom/12`} />
        </Route>
        
        <Route path="/saint-petersburg">
          <Redirect to={`/lat/59.935324/lon/30.314125/zoom/11`} />
        </Route>
        
        <Route path="/ekaterinburg">
          <Redirect to={`/lat/56.839542/lon/60.633391/zoom/11`} />
        </Route>
        
        <Route path="/novosibirsk">
          <Redirect to={`/lat/55.028348/lon/82.931337/zoom/11`} />
        </Route>

        <Route path="/nizhny-novgorod">
          <Redirect to={`/lat/56.301011/lon/43.995229/zoom/10`} />
        </Route>

        <Route path="/kazan">
          <Redirect to={`/lat/55.790216/lon/49.125194/zoom/12`} />
        </Route>

        <Route path="/samara">
          <Redirect to={`/lat/53.188109/lon/50.110306/zoom/13`} />
        </Route>

        <Route path="/orenburg">
          <Redirect to={`/lat/51.770342/lon/55.098720/zoom/13`} />
        </Route>

        <Route path="/arzamas">
          <Redirect to={`/lat/55.386373/lon/43.817099/zoom/12`} />
        </Route>

        <Route path="/balakhna">
          <Redirect to={`/lat/56.492938/lon/43.611212/zoom/12`} />
        </Route>

        <Route path="/bogorodsk">
          <Redirect to={`/lat/56.101523/lon/43.516550/zoom/12`} />
        </Route>

        <Route path="/bolshoe-murashkino">
          <Redirect to={`/lat/55.781787/lon/44.774134/zoom/12`} />
        </Route>

        <Route path="/vyksa">
          <Redirect to={`/lat/55.318686/lon/42.186628/zoom/12`} />
        </Route>

        <Route path="/gorbatov">
          <Redirect to={`/lat/56.131309/lon/43.058318/zoom/12`} />
        </Route>

        <Route path="/lyskovo">
          <Redirect to={`/lat/56.037971/lon/45.0478428/zoom/12`} />
        </Route>

        <Route path="/gorodets">
          <Redirect to={`/lat/56.644823/lon/43.469353/zoom/12`} />
        </Route>

        <Route path="/dzerzhinsk">
          <Redirect to={`/lat/56.238716/lon/43.461149/zoom/12`} />
        </Route>

        <Route path="/pavlovo">
          <Redirect to={`/lat/55.963602/lon/43.070018/zoom/12`} />
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
