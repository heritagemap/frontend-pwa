import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import MarkerProvider from 'contexts/sidebarContext';

import './App.scss';

function App() {
  const [currentMonument, setCurrentMonument] = useState(undefined);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <Router>
      <main>
        <MarkerProvider
          value={{
            monument: currentMonument,
            setCurrentMonument,
            sidebarIsOpen,
            onOpen: () => setSidebarIsOpen(true),
            onClose: () => setSidebarIsOpen(false),
          }}
        >
          <Switch>
            <Route
              path="/lat/:lat/lon/:lon/id/:id"
              children={
                <>
                  <Map />
                  <Sidebar />
                </>
              }
            />
            <Route path="/lat/:lat/lon/:lon" children={<Map />} />
            <Route path="/" children={<Map />} />
          </Switch>
        </MarkerProvider>
      </main>
    </Router>
  );
}

export default App;
