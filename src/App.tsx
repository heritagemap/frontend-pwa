import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Map from 'components/Map';
import Sidebar from 'components/Sidebar';

import './App.scss';

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route
            path="/lat/:lat/lon/:lon/:id?"
            children={
              <>
                <Map />
                <Sidebar />
              </>
            }
          />
          <Route path="/" children={<Map />} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
