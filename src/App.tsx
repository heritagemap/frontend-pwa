import React, { useState } from 'react';

import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import MarkerProvider from 'contexts/sidebarContext';

import './App.scss';



function App() {
  const [currentMonument, setCurrentMonument] = useState(undefined);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
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
        <Sidebar />
        <Map />
      </MarkerProvider>
    </main>
  );
}

export default App;
