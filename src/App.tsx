import React, { useEffect } from 'react';
import Map from 'components/Map';
import './App.scss';

const PAGES_RESOURCE = '/_api/heritage/?action=search&format=json&bbox=43.579856,56.062405,43.584620,56.064358'

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
      <Map />
    </main>
  );
}

export default App;
