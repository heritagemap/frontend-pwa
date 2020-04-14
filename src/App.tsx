import React, { useEffect } from 'react';
import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import './App.scss';

const PAGES_RESOURCE = '/_api?query=list-pages&prefix=%D0%9A%D1%83%D0%BB%D1%8C%D1%82%D1%83%D1%80%D0%BD%D0%BE%D0%B5_%D0%BD%D0%B0%D1%81%D0%BB%D0%B5%D0%B4%D0%B8%D0%B5_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8';

function App() {
  useEffect(() => {
    const loadPages = async () => {
      try {
        const response = await fetch(PAGES_RESOURCE);
        const pages = await response.json();
        console.log(pages);
      } catch(err) {

      }
    }

    loadPages();
  });

  return (
    <main>
      <Sidebar />
      <Map />
    </main>
  );
}

export default App;
